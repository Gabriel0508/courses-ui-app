import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { CoursesComponent } from './courses/courses.component';
import { CoursesDetailsComponent } from './course-details/courses-details.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { BrowserModule } from '@angular/platform-browser';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    LandingPageComponent,
    CoursesComponent,
    CoursesDetailsComponent,
  ],
  imports: [CommonModule, ReactiveFormsModule, BrowserModule, SharedModule],
  providers: [BsModalRef],
  exports: [LandingPageComponent, CoursesComponent, CoursesDetailsComponent],
})
export class ComponentsModule {}
