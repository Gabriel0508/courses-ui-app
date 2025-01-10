import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Item } from 'src/app/core/models/item.model';
import { ActivatedRoute } from '@angular/router';
import { CourseApiActions } from 'src/app/state/item/items.actions';
import { selectSelectedCourseId } from 'src/app/state/item/item.selectors';

@Component({
  selector: 'app-courses-details',
  templateUrl: './courses-details.component.html',
  styleUrls: ['./courses-details.component.scss'],
})
export class CoursesDetailsComponent implements OnInit {
  course: Item | undefined;

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
