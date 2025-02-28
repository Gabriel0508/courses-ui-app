import {
  ChangeDetectionStrategy,
  Component,
  inject,
  TemplateRef,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialog,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { Store, select } from '@ngrx/store';
import { delay, Observable, take } from 'rxjs';
import { Course } from 'src/app/core/models/course.model';
import { CourseApiActions } from 'src/app/state/item/item.actions';
import {
  selectCourseLoading,
  selectCoursesList,
} from 'src/app/state/item/item.selectors';
import { Router } from '@angular/router';
import { LoadingSpinnerComponent } from 'src/app/components/loading-spinner/loading-spinner.component';
import { ModalComponent } from 'src/app/components/modal/modal.component';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { AppState } from 'src/app/core/models/appState.model';
import { LayoutTemplateComponent } from '../layout-template/layout-template.component';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss'],
  imports: [
    CommonModule,
    MatTableModule,
    LoadingSpinnerComponent,
    MatButtonModule,
    MatIconModule,
    LayoutTemplateComponent,
    MatDialogModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CoursesComponent {
  items$: Observable<Course[]> | undefined;
  displayedColumns: string[] = [
    'position',
    'name',
    'weight',
    'symbol',
    'action',
  ]; //TODO: changes this
  isLoading$: Observable<boolean> | undefined;
  dataSource = new MatTableDataSource<any>([]); //TODO:use a real type instead any
  readonly dialog = inject(MatDialog);

  constructor(
    private readonly store: Store<AppState>,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.initDispatch();
    this.initSubscriptions();
  }

  onDeleteItem(id: number): void {
    this.store.dispatch(CourseApiActions.deleteCourse({ id }));

    this.items$
      ?.pipe(
        take(1),
        delay(5000) // Give it time to process
      )
      .subscribe((items) => {
        console.log('Items after delete:', items);
      });
  }

  onEditCourse() {
    console.log('works');
  }

  openModal() {
    this.dialog.open(ModalComponent, {
      disableClose: true,
    });
  }

  onCourseDetails(id: number) {
    this.router.navigate(['/course', id]);
  }

  private initDispatch(): void {
    this.store.dispatch(CourseApiActions.getCourses());
  }

  private initSubscriptions(): void {
    this.items$ = this.store.pipe(select(selectCoursesList));
    this.isLoading$ = this.store.pipe(select(selectCourseLoading));
  }
}
