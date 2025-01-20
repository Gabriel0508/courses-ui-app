import { Component, TemplateRef } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { delay, Observable, take } from 'rxjs';
import { Course } from 'src/app/core/models/course.model';
import { CourseApiActions } from 'src/app/state/item/item.actions';
import {
  selectCourseLoading,
  selectCoursesList,
} from 'src/app/state/item/item.selectors';
import { Router } from '@angular/router';
import { HeaderComponent } from 'src/app/shared/header/header.component';
import { LoadingSpinnerComponent } from 'src/app/shared/loading-spinner/loading-spinner.component';
import { ModalComponent } from 'src/app/shared/modal/modal.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss'],
  standalone: true,
  imports: [CommonModule, HeaderComponent, LoadingSpinnerComponent, ModalComponent]
})
export class CoursesComponent {
  items$: Observable<Course[]> | undefined;
  isLoading$: Observable<boolean> | undefined;

  constructor(
    private readonly store: Store,
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

  openModal(viewUserTemplate: TemplateRef<any>) {
    // this.modalRef = this.modalService.show(viewUserTemplate, {
    //   backdrop: 'static',
    //   ignoreBackdropClick: true,
    //   keyboard: false,
    //   animated: true,
    // });
    //TODO: use angular material
  }

  onCloseModal() {
   // this.modalRef?.hide();
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
