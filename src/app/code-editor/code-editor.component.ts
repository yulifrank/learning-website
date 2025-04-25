import { AfterViewInit, Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CodemirrorModule } from '@ctrl/ngx-codemirror';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';

import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/python/python';
import 'codemirror/mode/clike/clike';
import "codemirror/addon/hint/show-hint";
import "codemirror/addon/hint/javascript-hint";

declare function loadPyodide(config?: any): Promise<any>;
declare global {
  interface Window { pyodide: any; }
}

@Component({
  selector: 'app-code-editor',
  standalone: true,
  templateUrl: './code-editor.component.html',
  styleUrls: ['./code-editor.component.css'],
  imports: [
    CommonModule,
    FormsModule,
    CodemirrorModule,
    MatButtonModule,
    MatSelectModule
  ]
})
export class CodeEditorComponent implements AfterViewInit {
  @Input() initialCode: string = '';
  @Output() codeChanged = new EventEmitter<string>();
  @Output() closeEditor = new EventEmitter<void>();

  code: string = '';
  output: string = '';
  selectedLanguage = 'javascript';

  editorOptions = {
    lineNumbers: true,
    mode: 'javascript',
    theme: 'material',
    extraKeys: {
      "Ctrl-Space": "autocomplete",
      "Tab": "autocomplete",
      "Ctrl-Enter": () => this.runCode(),
    },
    hintOptions: {
      completeSingle: false,
    }
  };

  pyodideReady: Promise<void>;
  private pyodideReadyResolve!: () => void;

  languages = [
    {
      value: 'javascript',
      label: 'JavaScript',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg'
    },
    {
      value: 'python',
      label: 'Python',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg'
    },
    {
      value: 'csharp',
      label: 'C#',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg'
    }
  ];

  constructor() {
    console.log('Initializing CodeEditorComponent');
    this.pyodideReady = new Promise(resolve => {
      this.pyodideReadyResolve = resolve;
    });
  }

  ngAfterViewInit(): void {
    console.log('ngAfterViewInit triggered');
    this.initializePyodide();
  }

  async initializePyodide() {
    try {
      console.log('Attempting to load Pyodide');
      window.pyodide = await loadPyodide();
      this.pyodideReadyResolve();
      console.log('Pyodide loaded successfully');
    } catch (err) {
      console.error('Error loading Pyodide:', err);
    }
  }

  onSave() {
    console.log('Saving code:', this.code);
    this.codeChanged.emit(this.code);
    this.closeEditor.emit();
  }

  async runCode() {
    console.log('Running code...');
    try {
      this.output = 'Running...';
      let result: string;
      if (this.selectedLanguage === 'javascript') {
        console.log('Selected language: JavaScript');
        result = await this.runJavascript(this.code);
      } else if (this.selectedLanguage === 'python') {
        console.log('Selected language: Python');
        result = await this.runPython(this.code);
      } else if (this.selectedLanguage === 'csharp') {
        console.log('Selected language: C#');
        result = await this.runCSharp(this.code);
      } else {
        result = 'Run not supported for this language.';
      }
      this.output = result;
    } catch (err) {
      this.output = 'Error: ' + err;
      console.error('Error while running code:', err);
    }
  }

  runJavascript(code: string): Promise<string> {
    console.log('Running JavaScript code');
    return new Promise((resolve, reject) => {
      try {
        let consoleOutput = '';
        const originalConsoleLog = console.log;

        console.log = (...args: any[]) => {
          consoleOutput += args.join(' ') + '\n';
          originalConsoleLog.apply(console, args);
        };

        const result = new Function(code)();

        console.log = originalConsoleLog;
        resolve(consoleOutput.trim() || (result !== undefined ? String(result) : '[no output]'));
      } catch (err: any) {
        console.log = console.log;
        reject('JavaScript Error: ' + err.message);
      }
    });
  }

  async runPython(code: string): Promise<string> {
    console.log('Running Python code');
    try {
      await this.pyodideReady;
      const output = await window.pyodide.runPythonAsync(`
import sys
import io
sys.stdout = io.StringIO()
sys.stderr = sys.stdout

${code}

sys.stdout.getvalue()
      `);
      console.log('Python output:', output);
      return output || '[no output]';
    } catch (err: any) {
      console.error('Python Error:', err);
      return 'Python Error: ' + err.toString();
    }
  }

  runCSharp(code: string): Promise<string> {
    console.log('Running C# code');
    return new Promise((resolve, reject) => {
      try {
        // You could call a C# runtime or service here
        resolve('C# code execution not yet supported in this editor');
      } catch (err: any) {
        reject('C# Error: ' + err.message);
      }
    });
  }

  onLanguageChange() {
    console.log('Language changed to:', this.selectedLanguage);
    const lang = this.selectedLanguage;
    this.editorOptions.mode =
      lang === 'javascript' ? 'javascript' :
      lang === 'python' ? 'python' :
      lang === 'csharp' ? 'text/x-csharp' :
      'javascript';
  }

  getSelectedLanguageIcon(): string {
    return this.languages.find(lang => lang.value === this.selectedLanguage)?.icon || '';
  }

  getSelectedLanguageLabel(): string {
    return this.languages.find(lang => lang.value === this.selectedLanguage)?.label || '';
  }

  openDotNetFiddle() {
    console.log('Opening DotNetFiddle with code:', this.code);
    const encodedCode = encodeURIComponent(this.code || '');
    const url = `https://dotnetfiddle.net/?cs=${encodedCode}`;
    window.open(url, '_blank');
  }

  saveCodeFromIframe() {
    const iframe: HTMLIFrameElement = document.getElementById('dotnetFiddleIframe') as HTMLIFrameElement;
    if (iframe) {
      const iframeWindow = iframe.contentWindow;
      if (iframeWindow) {
        // Send a message to the iframe to retrieve the code
        iframeWindow.postMessage({ type: 'getCode' }, 'https://dotnetfiddle.net');
      }
    }
  }
  
  // קבלת הקוד מ-iframe
  ngOnInit() {
    console.log('ngOnInit triggered');
    window.addEventListener('message', this.handleIframeMessage.bind(this));
  }
  
  handleIframeMessage(event: MessageEvent) {
    // Ensure the event is from the correct iframe source
    if (event.origin === 'https://dotnetfiddle.net') {
      const message = event.data;
      if (message.type === 'code') {
        this.code = message.code;
        this.codeChanged.emit(this.code);
        console.log('Received code from iframe:', this.code);
      }
    }
  }
  
  
  
}
