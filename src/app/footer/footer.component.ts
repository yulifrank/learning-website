import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import emailjs from 'emailjs-com';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {
  successMessage: string = '';
  errorMessage: string = '';
  loading: boolean = false; // מצב טעינה

  constructor() {
    emailjs.init('jlPoMcKqkYLC4kfyT'); // החלף ב-User ID שלך
  }

  onSubmit(formData: any) {
    this.loading = true; // הצגת הספינר
  
    const templateParams = {
      to_name: 'Yael Frank',
      from_name: formData.value.name,
      email: formData.value.email,
      message: formData.value.message,
      to_email: 'yaelfrank0338@gmail.com',
      reply_to: formData.value.email,
    };
  
    emailjs.send('service_grqe9ah', 'template_1izx1dj', templateParams)
      .then(() => {
        this.successMessage = 'ההודעה נשלחה בהצלחה!';
        // הצגת ההודעה למשך 5 שניות ואז נעלמת
        setTimeout(() => {
          this.successMessage = '';
          this.loading = false;
        }, 5000);
      })
      .catch((error) => {
        this.errorMessage = `❌ שגיאה: ${error.text}`;
        this.successMessage = '';
        setTimeout(() => {
          this.errorMessage = '';
          this.loading = false;
        }, 5000);

      })
      .finally(() => {
        this.loading = false; // הסתרת הספינר
      });
  
    // שליחת אישור לשולח
    const senderParams = {
      to_name: formData.value.name,
      from_name: 'Dev מאת יעל',
      email: formData.value.email,
      message: formData.value.message,
      to_email: formData.value.email,
    };
  
    emailjs.send('service_grqe9ah', 'template_y5r5pbn', senderParams)
      .catch((error) => {
        console.log('שגיאה בשליחת מייל לשולח:', error);
      });
  
    formData.reset();
  }
  
}

