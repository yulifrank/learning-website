import { Component, OnInit } from '@angular/core';
import { VideoService } from '../video.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@Component({
  standalone:true,
  imports:[CommonModule,MatCardModule, MatButtonModule],
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  categories: any[] = [];  // מאחסן את הקטגוריות

  constructor(private videoService: VideoService, private router: Router) {}

  ngOnInit(): void {
    // טוען את כל הסרטונים
    this.videoService.getVideos().subscribe(
      (data: any) => {
        this.categories = data.categories;
      },
      (error) => {
        console.error('Error loading JSON file', error);
      }
    );
  }

  onVideoSelect(videoId: string): void {
    this.router.navigate(['/video', videoId]);
  }
  onCategorySelect(categoryName: string): void {
    this.router.navigate(['/topics', categoryName]);
  }
  
}

