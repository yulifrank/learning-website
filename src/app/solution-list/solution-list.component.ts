import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatCard, MatCardHeader, MatCardTitle, MatCardContent, MatCardActions } from '@angular/material/card';
import { ActivatedRoute } from '@angular/router';
import { codingChallenges } from '../../data'; // יש להחליף בנתיב המתאים לקובץ הנתונים
import { MatOption } from '@angular/material/core';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-solution-list',
  standalone: true,
  imports: [CommonModule, MatCard, MatCardHeader, MatCardTitle, MatCardContent,MatCardActions,MatIcon],
  templateUrl: './solution-list.component.html',
  styleUrls: ['./solution-list.component.css']
})
export class SolutionListComponent implements OnInit {
  solutions: any[] = [];

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    // שליפת ה-ID של השאלה
    const questionId = +this.route.snapshot.paramMap.get('id')!;
    console.log('Question ID from URL:', questionId); // הדפס את ה-ID שהתקבל מה-URL

    this.getSolutions(questionId);
  }

  getSolutions(questionId: number): void {
    console.log('codingChallenges:', codingChallenges); // הדפס את כל אתגרי הקידוד לקונסול

    // מציאת השאלה על פי ה-ID
    const question = codingChallenges.find(challenge => challenge.id === questionId);
    console.log('Question found:', question); // הדפס את השאלה שנמצאה לפי ה-ID

    if (question) {
      this.solutions = question.suggestedSolutions;
      console.log('Suggested Solutions:', this.solutions); // הדפס את הפתרונות שהתקבלו
    } else {
      console.log('No question found with ID:', questionId); // הדפס אם לא נמצאה שאלה עם ה-ID הזה
    }
  }
  copyCode(code: string) {
    // העתקת הקוד
    navigator.clipboard.writeText(code).then(() => {
        // עדכון המצב שהקוד הועתק
        const solution = this.solutions.find(s => s.code === code);
        if (solution) {
            solution.copied = true;
            setTimeout(() => {
                solution.copied = false;  // ביטול המצב לאחר זמן קצר
            }, 2000); // אפשר לשנות את הזמן לכמה שניות שתרצה
        }
    });
}
}
