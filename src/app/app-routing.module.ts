import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { ComponentsModule } from './components/components.module';
import { CoursesComponent } from './components/courses/courses.component';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from './shared/shared.module';
import { CoursesDetailsComponent } from './components/items-details/courses-details.component';

const routes: Routes = [
  { path: '', component: LandingPageComponent },
  { path: 'items', component: CoursesComponent },
  { path: 'items/:id', component: CoursesDetailsComponent }
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
