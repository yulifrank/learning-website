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
    { text: "תכנות זה לא רק לשבת מול מחשב, אלא ללמוד ולצמוח כל הזמן.", author: "אנדרו האנדרסון" },
    { text: "הצעד הראשון בשיפור היכולת שלך בתכנות הוא להפסיק לפחד מטעויות.", author: "מארק זוקרברג" },
    { text: "הידע הוא הכוח האמיתי, והדרך להעצימו היא ללמוד כל יום.", author: "חיים שגיא" },
    { text: "כל פיתוח הוא צעד נוסף בדרך להצלחה.", author: "דניאל גרוס" },
    { text: "תכנות הוא שפה שמביאה לתוצאה, כל קוד הוא שיר שנכתב מחדש.", author: "ניקולס סרגי" },
    { text: "הדרך הטובה ביותר לחזות את העתיד היא ליצור אותו.", author: "אלן קיי" },
    { text: "תכנות היום זה יותר על אנשים מאשר על מכונות.", author: "ג'רלד ויינברג" },
    { text: "הדבר הכי מסוכן הוא לחשוב שאין מה ללמוד.", author: "סטיב ג'ובס" },
    { text: "האם זה לא כיף כשמשהו פשוט עובד?", author: "קנת' תומפסון" },
    { text: "תכנות הוא אומנות הארגון של המורכבות.", author: "אדסחר דייקסטרה" },
    { text: "תכנות זה לא רק לדעת איך לכתוב קוד, אלא לדעת איך לפתור בעיות.", author: "ג'ון קארמאק" },
    { text: "המשמעות האמיתית של תכנות היא ללמוד כל יום משהו חדש.", author: "קריס הרמן" },
    { text: "אין בעיה שאי אפשר לפתור בעזרת תכנות נכון.", author: "אדגר דה פנטה" },
    { text: "תכנות הוא לא רק מקצוע, הוא דרך חיים.", author: "דג'ו קונדי" },
  ];

  currentQuote = 0;

  constructor() { }

  ngOnInit(): void {
    setInterval(() => {
      this.currentQuote = (this.currentQuote + 1) % this.quotes.length;
    }, 5000); // change quote every 6 seconds
  }
}
