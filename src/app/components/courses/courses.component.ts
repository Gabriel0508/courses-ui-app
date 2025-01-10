import { Component, TemplateRef } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { delay, Observable, take } from 'rxjs';
import { Item } from 'src/app/core/models/item.model';
import { CourseApiActions } from 'src/app/state/item/items.actions';
import {
  selectCourseLoading,
  selectCoursesList,
} from 'src/app/state/item/item.selectors';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Router } from '@angular/router';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss'],
})
export class CoursesComponent {
  items$: Observable<Item[]> | undefined;
  isLoading$: Observable<boolean> | undefined;
  modalRef?: BsModalRef;

  constructor(
    private readonly store: Store,
    private modalService: BsModalService,
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

  openModal(viewUserTemplate: TemplateRef<any>) {
    this.modalRef = this.modalService.show(viewUserTemplate, {
      backdrop: 'static',
      ignoreBackdropClick: true,
      keyboard: false,
      animated: true,
    });
  }

  onCloseModal() {
    this.modalRef?.hide();
  }

  onCourseDetails(id: number) {
    this.router.navigate(['/items', id]);
  }

  private initDispatch(): void {
    this.store.dispatch(CourseApiActions.getCourses());
  }

  private initSubscriptions(): void {
    this.items$ = this.store.pipe(select(selectCoursesList));
    this.isLoading$ = this.store.pipe(select(selectCourseLoading));
  }
}
