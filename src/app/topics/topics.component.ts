import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { VideoService } from '../video.service';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-topics',
  standalone: true,
  imports: [CommonModule,    MatCardModule,
    MatButtonModule],
  templateUrl: './topics.component.html',
  styleUrls: ['./topics.component.css']
})
export class TopicsComponent implements OnInit {
  categoryName: string | null = '';
  videos: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private videoService: VideoService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.categoryName = this.route.snapshot.paramMap.get('categoryName');
    if (this.categoryName) {
      this.videoService.getVideos().subscribe(
        (data: any) => {
          const category = data.categories.find(
            (cat: any) => cat.name === this.categoryName
          );
          this.videos = category ? category.videos : [];
        },
        (error) => {
          console.error('Error loading videos:', error);
        }
      );
    }
  }
  onSelectVideo(video: any): void {
    console.log(video);  // הוספת לוג כדי לבדוק את פרטי הסרטון
    // if (!video || !video.videoId) {
    //   console.error('Video ID is undefined:', video);
    //   return;
    // }
    this.router.navigate(['/video', video.youtubeId]);
  }
  
  
}