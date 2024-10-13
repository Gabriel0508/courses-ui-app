import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Item } from 'src/app/core/models/item.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CourseApiActions } from 'src/app/state/item/items.actions';
import { selectCoursesList } from 'src/app/state/item/item.selectors';
import { ItemService } from 'src/app/core/services/item.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss'],
})
export class CoursesComponent {
  items$: Observable<Item[]> | undefined;
  isLoading$: Observable<boolean> | undefined;

  constructor(private readonly store: Store) {}

  ngOnInit(): void {
    this.initDispatch();
    this.initSubscriptions();
  }

  onDeleteItem(item: Item): void {
    this.store.dispatch(CourseApiActions.deleteCourse({ course: item }));
  }

  private initDispatch(): void {
    this.store.dispatch(CourseApiActions.getCourses());
  }

  private initSubscriptions(): void {
    this.items$ = this.store.pipe(select(selectCoursesList));
    // this.isLoading$ = this.store.pipe(select(CourseApiActions.selectItemIsLoading));
  }
}
