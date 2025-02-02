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

  // פונקציה לאימות כתובת מייל תקינה
  isValidEmail(email: string): boolean {
    // תבנית רגולרית לבדוק אם המייל תואם לפורמט תקני
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(email);
  }
  onSubmit(formData: any) {
    const email = formData.value.email;
  
    // אם המייל לא תקין או לא תואם לתבנית של Angular
    if (formData.controls.email.invalid) {
      this.errorMessage = '❌ כתובת המייל אינה תקינה. אנא הזן מייל תקין.';
      this.successMessage = '';  // נמחק את הודעת ההצלחה אם יש שגיאה
      return;  // לא שולחים את המייל אם כתובת המייל אינה תקינה
    }
  
    // אם המייל תקין, ממשיכים לשלוח את המייל
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
