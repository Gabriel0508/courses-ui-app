import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { ComponentsModule } from './components/components.module';
import { CoursesComponent } from './components/courses/courses.component';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from './shared/shared.module';
import { CoursesDetailsComponent } from './components/course-details/courses-details.component';

const routes: Routes = [
  { path: 'home', component: LandingPageComponent},
  { path: 'courses', component: CoursesComponent },
  { path: 'course/:id', component: CoursesDetailsComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', redirectTo: '/home' },
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes),
    ComponentsModule,
    SharedModule,
    HttpClientModule,
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
