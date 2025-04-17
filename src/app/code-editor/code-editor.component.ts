import { AfterViewInit, Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CodemirrorModule } from '@ctrl/ngx-codemirror';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';

import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/python/python';
import 'codemirror/mode/clike/clike'; // For C#
import "codemirror/mode/python/python"; // ודא שאתה טוען את המודול של פייתון
import "codemirror/addon/hint/show-hint"; // הוסף את תוסף ההשלמה האוטומטית
import "codemirror/addon/hint/javascript-hint"; // להשלמה אוטומטית ב-JavaScript

declare function loadPyodide(config?: any): Promise<any>;

declare global {
  interface Window {
    pyodide: any;
  }
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
    mode: 'javascript',  // אתה יכול לשנות את זה לפי השפה שבחרת
    theme: 'material',
    extraKeys: {
      "Ctrl-Space": "autocomplete",  // לחצן להשלמה אוטומטית
      "Tab": "autocomplete",  // לחצן Tab להשלמה אוטומטית
      "Ctrl-Enter": () => this.runCode(),  // אפשר להריץ את הקוד עם Ctrl+Enter
    },
    hintOptions: {
      completeSingle: false,  // על מנת לא להשלם אוטומטית ברגע שאתה מתחיל להקליד
    }
  };

  pyodideReady: Promise<void>;
  private pyodideReadyResolve!: () => void;

  constructor() {
    this.pyodideReady = new Promise(resolve => {
      this.pyodideReadyResolve = resolve;
    });
  }

  ngAfterViewInit(): void {
    console.log('Editor initialized');
    this.initializePyodide();
  }

  async initializePyodide() {
    try {
      console.log('Loading Pyodide...');
      window.pyodide = await loadPyodide();
      this.pyodideReadyResolve(); // Marks Pyodide as ready
      console.log('Pyodide loaded successfully');
    } catch (err) {
      console.error('Error loading Pyodide:', err);
    }
  }

  onSave() {
    this.codeChanged.emit(this.code);
    this.closeEditor.emit();
  }
  async runCode() {
    try {
      this.output = 'Running...'; // Show running message
      console.log('Starting to run code');
      
      let result: string;
      if (this.selectedLanguage === 'javascript') {
        result = await this.runJavascript(this.code); // Run JavaScript
      } else if (this.selectedLanguage === 'python') {
        result = await this.runPython(this.code); // Run Python
      } else if (this.selectedLanguage === 'csharp') {
        result = await this.runCSharp(this.code); // Run C#
      } else {
        result = 'Unsupported language'; // If language is not supported
      }
      
      this.output = result;
      console.log(result);
    } catch (err) {
      this.output = 'Error: ' + err; // In case of error
      console.error('Error running code:', err);
    }
  }
  
  // הפונקציה הזו מאפשרת להפעיל גם פונקציות שמוגדרות בקוד
  runJavascript(code: string): Promise<string> {
    return new Promise((resolve, reject) => {
      try {
        let consoleOutput = '';
        const originalConsoleLog = console.log;
  
        console.log = (...args: any[]) => {
          consoleOutput += args.join(' ') + '\n';
          originalConsoleLog.apply(console, args);
        };
  
        // כאן אנחנו בודקים אם יש פונקציות בקוד (אם יש, נריץ אותן)
        const result = new Function(code)();
  
        console.log = originalConsoleLog;
  
        resolve(consoleOutput.trim() || (result !== undefined ? String(result) : '[no output]'));
      } catch (err: any) {
        console.log = console.log; // Restore console.log
        reject('JavaScript Error: ' + err.message);
      }
    });
  }
  

  async runPython(code: string): Promise<string> {
    try {
      await this.pyodideReady; // Wait for Pyodide to load

      const output = await window.pyodide.runPythonAsync(`
        import sys
        import io
        sys.stdout = io.StringIO()
        sys.stderr = sys.stdout

        ${code}

        sys.stdout.getvalue()
      `);
      return output || '[no output]';
    } catch (err: any) {
      console.error('Python execution failed:', err);
      return 'Python Error: ' + err.toString();
    }
  }

  async runCSharp(code: string): Promise<string> {
    const data = {
      LanguageChoice: 1,  // 1 = C#
      Program: code,
      Input: '',
      CompilerArgs: ''
    };

    try {
      const response = await fetch('https://rextester.com/rundotnet/api', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      const result = await response.json();

      if (result.Errors) {
        console.error('C# Error:', result.Errors);
        return 'C# Error: ' + result.Errors;
      }

      // Check if result is present and valid
      if (result.Result) {
        return result.Result || '[no output]';
      } else {
        return '[no output]';
      }
    } catch (err: any) {
      console.error('C# Execution Error:', err);
      return 'C# Execution Error: ' + err.message;
    }
  }

  onLanguageChange() {
    const lang = this.selectedLanguage;
    this.editorOptions.mode =
      lang === 'javascript' ? 'javascript' :
      lang === 'python' ? 'python' :
      lang === 'csharp' ? 'text/x-csharp' :
      'javascript';
  }
}
