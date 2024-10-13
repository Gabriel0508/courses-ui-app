import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { SharedModule } from '../shared/shared.module';
import { CoursesComponent } from './courses/courses.component';
import { CoursesDetailsComponent } from './items-details/courses-details.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CourseFormComponent } from './course-form/course-form.component';



@NgModule({
  declarations: [
    LandingPageComponent,
    CoursesComponent,
    CoursesDetailsComponent,
    CourseFormComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule
  ],
  exports: [LandingPageComponent, CoursesComponent, CoursesDetailsComponent]
})
export class ComponentsModule { }
