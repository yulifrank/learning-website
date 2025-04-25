import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-quotes',
  standalone: true,
  imports: [],
  templateUrl: './quotes.component.html',
  styleUrls: ['./quotes.component.css']
})
export class QuoteComponent implements OnInit {

  quotes = [
    { text: "Talk is cheap. Show me the code.", author: "Linus Torvalds" },
    { text: "Programs must be written for people to read, and only incidentally for machines to execute.", author: "Harold Abelson" },
    { text: "Don't comment bad code—rewrite it.", author: "Brian Kernighan" },
    { text: "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.", author: "Martin Fowler" },
    { text: "First, solve the problem. Then, write the code.", author: "John Johnson" },
    { text: "Simplicity is the soul of efficiency.", author: "Austin Freeman" },
    { text: "The best programs are written so that computing machines can perform them quickly and so that human beings can understand them clearly.", author: "Donald Knuth" },
    { text: "It’s harder to read code than to write it.", author: "Joel Spolsky" }
  ];

  currentQuote = 0;

  constructor() { }

  ngOnInit(): void {
    setInterval(() => {
      this.currentQuote = (this.currentQuote + 1) % this.quotes.length;
    }, 5000); // change quote every 6 seconds
  }
}
