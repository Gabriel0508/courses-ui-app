import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable, tap } from 'rxjs';
import { Course } from 'src/app/core/models/item.model';
import { Router } from '@angular/router';
import {
  selectCoursesList,
  selectSelectedCourseId,
} from 'src/app/state/item/item.selectors';
import { CourseApiActions } from 'src/app/state/item/item.actions';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss'],
})
export class LandingPageComponent {
  allCourses$: Observable<Course[]> | undefined;

  constructor(private readonly store: Store, private readonly router: Router) {}

  ngOnInit(): void {
    this.initDispatch();
    this.initSubscriptions();
  }

  onNavigateToAllCourses(url: string) {
    this.router.navigateByUrl('/courses');
  }

  onCourseDetails(id: number) {
    this.router.navigate(['/course', id]);
  }

  initSubscriptions(): void {
    (this.allCourses$ = this.store.pipe(select(selectCoursesList))),
      tap((data) => console.log('selectCoursesList emitted:', data));
  }

  initDispatch(): void {
    this.store.dispatch(CourseApiActions.getCourses());
  }
}
