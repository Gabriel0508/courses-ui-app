import { LandingPageComponent } from './components/dashboard/landing-page/landing-page.component';
import { CoursesComponent } from './components/dashboard/courses/courses.component';
import { CoursesDetailsComponent } from './components/dashboard/course-details/courses-details.component';
import { Routes } from '@angular/router';
import { LoginComponent } from './components/authentication/login/login.component';
import { RegisterComponent } from './components/authentication/register/register.component';
import { authGuard } from './guards/auth.guard';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { UserProfileComponent } from './components/dashboard/user-profile/user-profile.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      { path: 'home', component: LandingPageComponent },
      { path: 'courses', component: CoursesComponent },
      { path: 'course/:id', component: CoursesDetailsComponent },
      { path: 'profile', component: UserProfileComponent },
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: '**', redirectTo: '/home' },
    ],
    canActivate: [authGuard],
  },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: '**', redirectTo: '/dashboard' },
];
