import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { codingChallenges } from '../../data';
import { RouterModule } from '@angular/router';

import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-coding-race',
  standalone: true,
  imports: [ CommonModule,RouterModule,MatIcon],
  templateUrl: './coding-race.component.html',
  styleUrl: './coding-race.component.css'
})
export class CodingRaceComponent {
  challenges = codingChallenges;
  scrollToTop() {
    window.scrollTo(0, 0); // גלילה לראש העמוד
  }
  
}