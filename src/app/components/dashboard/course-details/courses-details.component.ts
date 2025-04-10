import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Course } from 'src/app/core/models/course.model';
import { ActivatedRoute } from '@angular/router';
import { CourseApiActions } from 'src/app/state/item/item.actions';
import {
  selectCourseLoading,
  selectSelectedCourseId,
} from 'src/app/state/item/item.selectors';
import { LoadingSpinnerComponent } from 'src/app/components/loading-spinner/loading-spinner.component';
import { map, Observable, Subject, switchMap, takeUntil, tap } from 'rxjs';
import { CommonModule } from '@angular/common';
import { LayoutTemplateComponent } from '../layout-template/layout-template.component';

@Component({
  selector: 'app-courses-details',
  templateUrl: './courses-details.component.html',
  styleUrls: ['./courses-details.component.scss'],
  imports: [LoadingSpinnerComponent, CommonModule, LayoutTemplateComponent],
  standalone: true,
})
export class CoursesDetailsComponent implements OnInit {
  course: Course | undefined;
  isLoading$: Observable<boolean> | undefined;
  private destroy$ = new Subject<void>();

  constructor(private readonly store: Store, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.isLoading$ = this.store.pipe(select(selectCourseLoading));

    this.route.paramMap
      .pipe(
        takeUntil(this.destroy$),
        map((params) => params.get('id')!),
        tap((id) => {
          this.store.dispatch(CourseApiActions.getCourseId({ id }));
        }),
        switchMap(() => this.store.select(selectSelectedCourseId))
      )
      .subscribe((course) => {
        this.course = course;
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
