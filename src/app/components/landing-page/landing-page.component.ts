import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable, tap } from 'rxjs';
import { Course } from 'src/app/core/models/course.model';
import {
  selectCoursesList
} from 'src/app/state/item/item.selectors';
import { CourseApiActions } from 'src/app/state/item/item.actions';
import { Router } from '@angular/router';
import { HeaderComponent } from 'src/app/shared/header/header.component';
import { FooterComponent } from 'src/app/shared/footer/footer.component';
import { BannerComponent } from 'src/app/shared/banner/banner.component';
import { GenericCardComponent } from 'src/app/shared/generic-card/generic-card.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss'],
  standalone: true,
  imports: [CommonModule, HeaderComponent, FooterComponent, BannerComponent, GenericCardComponent]
})
export class LandingPageComponent {
  allCourses$: Observable<Course[]> | undefined;

  constructor(private readonly store: Store, private router: Router) {}

  ngOnInit(): void {
    this.initDispatch();
    this.initSubscriptions();
  }

  onNavigateToAllCourses() {
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
