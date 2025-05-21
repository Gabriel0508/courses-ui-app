import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import {
  BehaviorSubject,
  combineLatest,
  map,
  Observable,
  Subscription,
} from 'rxjs';
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
import { User } from 'firebase/auth';
import { AuthService } from 'src/app/core/services/auth.service';
import {
  CoursesHeaderComponent,
  Tab,
} from '../../courses-header/courses-header.component';
import { MatButtonModule } from '@angular/material/button';

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
    CoursesHeaderComponent,
    MatButtonModule,
  ],
})
export class LandingPageComponent implements OnInit {
  allCourses$!: Observable<Course[]>;
  isLoading$!: Observable<boolean>;
  user: User | null = null;
  filteredCourses$!: Observable<Course[]>;

  activeTab$ = new BehaviorSubject<Tab>('all');
  private authStateSubscription?: Subscription;
  displayCourses$!: Observable<Course[]>;
  hasMore$!: Observable<boolean>;

  constructor(
    private store: Store,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.initDispatch();
    this.initSubscriptions();

    this.filteredCourses$ = combineLatest([
      this.allCourses$,
      this.activeTab$,
    ]).pipe(
      map(([courses, tab]) => {
        switch (tab) {
          case 'newest':
            return [...courses].sort(
              (a, b) =>
                (b.createdAt?.toMillis() ?? 0) - (a.createdAt?.toMillis() ?? 0)
            );
          // case 'popular':
          //   return courses.filter((c) => c.enrollments > 1000); //TODO: after the user roles are set
          case 'all':
          default:
            return courses;
        }
      })
    );

    this.displayCourses$ = this.filteredCourses$.pipe(
      map((courses) => courses.slice(0, 8))
    );

    this.hasMore$ = this.filteredCourses$.pipe(
      map((courses) => courses.length > 8)
    );

    this.authStateSubscription = this.authService
      .getAuthState()
      .subscribe((user) => {
        this.user = user;
      });
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

  onTabChange(tab: Tab): void {
    this.activeTab$.next(tab);
  }

  trackByCourse(_: number, course: Course): string {
    return course.id!;
  }
}
