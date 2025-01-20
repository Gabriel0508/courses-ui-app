import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Course } from 'src/app/core/models/course.model';
import { ActivatedRoute } from '@angular/router';
import { CourseApiActions } from 'src/app/state/item/item.actions';
import { selectSelectedCourseId } from 'src/app/state/item/item.selectors';
import { HeaderComponent } from 'src/app/shared/header/header.component';
import { LoadingSpinnerComponent } from 'src/app/shared/loading-spinner/loading-spinner.component';

@Component({
  selector: 'app-courses-details',
  templateUrl: './courses-details.component.html',
  styleUrls: ['./courses-details.component.scss'],
  standalone: true,
  imports: [HeaderComponent, LoadingSpinnerComponent]
})
export class CoursesDetailsComponent implements OnInit {
  course: Course | undefined;

  constructor(private readonly store: Store, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = Number(params.get('id'));

      this.store.dispatch(CourseApiActions.getCourseId({ id }));

      this.store
        .select(selectSelectedCourseId)
        .subscribe((course) => (this.course = course)); //TODO: unsubscribe
    });
  }
}
