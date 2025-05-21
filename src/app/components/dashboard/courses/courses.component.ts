import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Course } from 'src/app/core/models/course.model';
import { CourseApiActions } from 'src/app/state/item/item.actions';
import {
  selectCourseLoading,
  selectCoursesList,
} from 'src/app/state/item/item.selectors';
import { Router } from '@angular/router';
import { LoadingSpinnerComponent } from 'src/app/components/loading-spinner/loading-spinner.component';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { AppState } from 'src/app/core/models/appState.model';
import { LayoutTemplateComponent } from '../layout-template/layout-template.component';
import { CreateCourseComponent } from '../../modal/create-course-modal/create-course-modal.component';
import { ConfirmationModalComponent } from '../../modal/confirmation-modal/confirmation-modal.component';
import { showNotificationActions } from 'src/app/state/notification/notification.actions';
import { BannerComponent } from '../banner/banner.component';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    LoadingSpinnerComponent,
    MatButtonModule,
    MatIconModule,
    LayoutTemplateComponent,
    MatDialogModule,
    BannerComponent
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CoursesComponent implements OnInit {
  items$: Observable<Course[]> | undefined;
  isLoading$: Observable<boolean> | undefined;
  dataSource = new MatTableDataSource<Course>([]);

  displayedColumns: string[] = ['id', 'name', 'description', 'owner', 'action'];

  readonly dialog = inject(MatDialog);

  constructor(
    private readonly store: Store<AppState>,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.initDispatch();
    this.initSubscriptions();
  }

  private initDispatch(): void {
    this.store.dispatch(CourseApiActions.getCourses());
  }

  private initSubscriptions(): void {
    this.items$ = this.store.pipe(select(selectCoursesList));
    this.isLoading$ = this.store.pipe(select(selectCourseLoading));

    this.items$.subscribe((courses) => {
      this.dataSource.data = courses;
    });
  }

  onDeleteItem(id: string): void {
    const dialogRef = this.dialog.open(ConfirmationModalComponent, {
      data: {
        title: 'Delete Course',
        message: 'Are you sure you want to delete this course?',
      },
      disableClose: true,
      autoFocus: false,
      restoreFocus: false,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result === true) {
        this.store.dispatch(CourseApiActions.deleteCourse({ id }));
        this.store.dispatch(
          showNotificationActions.showNotification({
            message: `The course was deleted successfully`,
            notificationType: 'success',
          })
        );
      }
    });
  }

  onEditCourse(item: Course): void {
    console.log('Editing course:', item);
    // Add modal or navigation logic here
  }

  openModal(): void {
    this.dialog.open(CreateCourseComponent, {
      disableClose: true,
      autoFocus: false,
      restoreFocus: false,
    });
  }

  onCourseDetails(id: number): void {
    this.router.navigate(['/dashboard/course', id]);
  }
}

