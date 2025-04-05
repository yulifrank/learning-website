import { CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { codingChallenges } from '../../data';
import Emailjs from 'emailjs-com';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@mui/icons-material';
import { Location } from '@angular/common';


@Component({
  selector: 'app-question-detail',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatInputModule,
    MatCardModule,
    MatFormFieldModule,
    MatIconModule,
    RouterModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './question-detail.component.html',
  styleUrls: ['./question-detail.component.css']
})
export class QuestionDetailComponent {
  question: any = {}; 
  firstName: string = '';
  lastName: string = '';
  email: string = '';
  userSolution: string = '';
  successMessage: string = '';
  errorMessage: string = '';
  loading: boolean = false;
  showForm: boolean = false;
  deadlinePassed: boolean;
  deadlineProgress: number = 0;
  deadlineDate: Date = new Date(2025, 6, 1); // March is month 2
  startDate: Date = new Date(2025, 1, 1); // February is month 1

  constructor(private route: ActivatedRoute ,private location: Location) {
    this.deadlinePassed = new Date() > this.deadlineDate;

    const totalDuration = this.deadlineDate.getTime() - this.startDate.getTime();
    const elapsedTime = new Date().getTime() - this.startDate.getTime();
    this.deadlineProgress = Math.max(0, Math.min(100, (elapsedTime / totalDuration) * 100));

    const questionId = Number(this.route.snapshot.paramMap.get('id'));
    this.question = codingChallenges.find(q => q.id === questionId) || {};
  }

  sendSolution() {
    if (this.deadlinePassed) {
      this.errorMessage = "❌ The deadline for submitting a solution has passed.";
      setTimeout(() => this.errorMessage = '', 5000);
      return;
    }

    if (!this.firstName || !this.lastName || !this.email) {
      this.errorMessage = "All fields must be filled.";
      return;
    }

    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(this.email)) {
      this.errorMessage = "Please enter a valid email address.";
      return;
    }

    const codePattern = /([{}();[\]<>])/;
    if (!codePattern.test(this.userSolution)) {
      this.errorMessage = "❌ Please enter valid code, not just plain text.";
      return;
    }

    this.loading = true;

    const templateParams = {
      questionTitle: this.question.title,
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      userSolution: this.userSolution,
    };

    Emailjs.send("service_z6fharp", "template_ga65e1w", templateParams, "Cz5nqu3ctq_otfrnr")

      .then(() => {
        this.successMessage = "✅ The solution is submitted successfully!";
        this.firstName = "";
        this.lastName = "";
        this.email = "";
        this.userSolution = "";
      })
      .catch(error => {
        this.errorMessage = `❌ Error in sending: ${error?.text || "Unknown error"}`;
      })
      .finally(() => {
        this.loading = false;
        setTimeout(() => {
          if (!this.errorMessage) this.successMessage = '';
        }, 5000);
      });
  }

  toggleForm(): void {
    this.showForm = !this.showForm;
  }

  async copyCode() {
    try {
      await navigator.clipboard.writeText(this.userSolution);
      this.successMessage = "✅ Code Copied!";
      setTimeout(() => this.successMessage = '', 3000);
    } catch (error) {
      this.errorMessage = "❌ FAILED TO COPY!";
      setTimeout(() => this.errorMessage = '', 3000);
    }
  }
  goBack(): void {
    this.location.back();
  }
  
}
