import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { VideoComponent } from './video/video.component';
import { TopicsComponent } from './topics/topics.component';
import { AboutComponent } from './about/about.component';

export const routes: Routes = [
  { path: '', component: HomeComponent }, // דף הבית
  { path: 'video/:videoId', component: VideoComponent }, // דף סרטון
  { path: 'topics/:categoryName', component: TopicsComponent }, // דף נושאים
  { path: 'about', component: AboutComponent } // נתיב חדש לדף אודות
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
