import { Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Course } from 'src/app/core/models/course.model';
import {
  selectCourseLoading,
  selectCoursesList,
} from 'src/app/state/item/item.selectors';
import { CourseApiActions } from 'src/app/state/item/item.actions';
import { Router } from '@angular/router';
import { BannerComponent } from 'src/app/components/dashboard/banner/banner.component';
import { CommonModule } from '@angular/common';
import { LayoutTemplateComponent } from '../layout-template/layout-template.component';
import { GenericCardComponent } from '../../generic-card/generic-card.component';
import { LoadingSpinnerComponent } from '../../loading-spinner/loading-spinner.component';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss'],
  imports: [
    CommonModule,
    BannerComponent,
    LayoutTemplateComponent,
    GenericCardComponent,
    LoadingSpinnerComponent,
    
],
})
export class LandingPageComponent {
  allCourses$: Observable<Course[]> | undefined;
  isLoading$: Observable<boolean> | undefined;

  constructor(private store: Store, private router: Router) {}

  ngOnInit(): void {
    this.initDispatch();
    this.initSubscriptions();
  }

  onNavigateToAllCourses() {
   this.router.navigateByUrl('/dashboard/courses');
  }

  onCourseDetails(id: string | undefined) {
    this.router.navigate(['/dashboard/course', id]);
  }

  initSubscriptions(): void {
    this.allCourses$ = this.store.pipe(select(selectCoursesList));
    this.isLoading$ = this.store.pipe(select(selectCourseLoading));
  }

  initDispatch(): void {
    this.store.dispatch(CourseApiActions.getCourses());
  }
}
