
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class VideoService {
  private jsonUrl = 'assets/videos.json';

  constructor(private http: HttpClient) {}
  getVideos(): Observable<any> {
    return this.http.get(this.jsonUrl).pipe(
      tap(data => {
        console.log('Videos loaded:', data); // הדפסת הנתונים המתקבלים
      }),
      catchError(error => {
        console.error('Error loading video data', error);
        return of({ categories: [] }); // מחזיר אובייקט עם קטגוריות ריקות
      })
    );
  }
  
}
