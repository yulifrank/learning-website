import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { VideoService } from '../video.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.css']
})
export class VideoComponent implements OnInit {
  videoId: string = '';
  videoUrl: SafeResourceUrl = '';
  

  constructor(private route: ActivatedRoute, private videoService: VideoService, private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.videoId = params['videoId'];
      this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(`https://www.youtube.com/embed/${this.videoId}`);
    });
  }
  
  onVideoLoad() {
    const videoContainer = document.querySelector('.video-container');
    if (videoContainer) {
      videoContainer.classList.add('loaded');
    }
  }
  goBack() {
    window.history.back();  // יחזיר את המשתמש לדף הקודם
  }
  
}
