import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { CoursesComponent } from './components/courses/courses.component';
import { CoursesDetailsComponent } from './components/course-details/courses-details.component';
import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: 'home', component: LandingPageComponent },
  { path: 'courses', component: CoursesComponent },
  { path: 'course/:id', component: CoursesDetailsComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', redirectTo: '/home' },
];
