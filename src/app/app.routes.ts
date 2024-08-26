import { Routes } from '@angular/router';
import { QuestionsComponent } from './components/questions/questions.component';
import { QuestionManagementComponent } from './components/question-management/question-management.component';

export const routes: Routes = [
  { path: '', redirectTo: '/question', pathMatch: 'full' },
  { path: 'question', component: QuestionsComponent },
  { path: 'question-management', component: QuestionManagementComponent },
];
