import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable, tap } from 'rxjs';
import { Course } from 'src/app/core/models/course.model';
import { selectCoursesList } from 'src/app/state/item/item.selectors';
import { CourseApiActions } from 'src/app/state/item/item.actions';
import { Router } from '@angular/router';
import { BannerComponent } from 'src/app/components/dashboard/banner/banner.component';
import { CommonModule } from '@angular/common';
import { LayoutTemplateComponent } from '../layout-template/layout-template.component';
import { GenericCardComponent } from '../../generic-card/generic-card.component';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss'],
  imports: [
    CommonModule,
    BannerComponent,
    LayoutTemplateComponent,
    GenericCardComponent,
  ],
})
export class LandingPageComponent {
  allCourses$: Observable<Course[]> | undefined;

  constructor(private readonly store: Store, private router: Router) {}

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
  }

  initDispatch(): void {
    this.store.dispatch(CourseApiActions.getCourses());
  }
}
