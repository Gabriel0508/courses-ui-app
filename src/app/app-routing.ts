import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { CoursesComponent } from './components/courses/courses.component';
import { CoursesDetailsComponent } from './components/course-details/courses-details.component';
import { Routes } from '@angular/router';
import { LoginComponent } from './authentication/login/login.component';
import { authGuard } from './guards/auth.guard';
import { RegisterComponent } from './authentication/register/register.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { 
    path: 'home', 
    component: LandingPageComponent, 
    canActivate: [authGuard]
  },
  { path: 'courses', component: CoursesComponent },
  { path: 'course/:id', component: CoursesDetailsComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', redirectTo: 'home' },
];
