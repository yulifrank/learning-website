
import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VideoService } from '../video.service';
import { VideoComponent } from "../video/video.component";

@Component({
  selector: 'app-video-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './video-list.component.html',
  styleUrls: ['./video-list.component.css']
})
export class VideoListComponent implements OnInit {
  @Input() categoryName: string | null = '';  // קבלת שם הקטגוריה מההורה
  videos: any[] = [];  // מערך של סרטונים
  selectedVideo: any;  // הסרטון שנבחר לצפיה

  constructor(private videoService: VideoService) {}

  ngOnInit(): void {
    if (this.categoryName) {
      // קריאה לשירות לקבלת הסרטונים
      this.videoService.getVideos().subscribe((data: any) => {
        const category = data.categories.find((cat: any) => cat.name === this.categoryName);
        
        if (category) {
          this.videos = category.videos;
          if (this.videos.length > 0) {
            this.selectedVideo = this.videos[0];  // בוחר את הסרטון הראשון
          }
        }
      }, (error) => {
        console.error('שגיאה בטעינת הסרטונים:', error);
      });
    }
  }

  onSelectVideo(video: any): void {
    this.selectedVideo = video;
  }
}
