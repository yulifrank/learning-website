import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { VideoComponent } from './video/video.component';
import { TopicsComponent } from './topics/topics.component';
import { AboutComponent } from './about/about.component';
import { CodingRaceComponent } from './coding-race/coding-race.component';
import { QuestionDetailComponent } from './question-detail/question-detail.component';
import { SolutionListComponent } from './solution-list/solution-list.component';

export const routes: Routes = [
  { path: '', component: HomeComponent }, // דף הבית
  { path: 'video/:videoId', component: VideoComponent }, // דף סרטון
  { path: 'topics/:categoryName', component: TopicsComponent }, // דף נושאים
  { path: 'about', component: AboutComponent }, // נתיב חדש לדף אודות
  { path: 'coding-race', component: CodingRaceComponent }, // ✅ נתיב חדש למירוץ קוד
  { path: 'coding-race/:id', component: QuestionDetailComponent },
  { path: 'solution/:id', component: SolutionListComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
