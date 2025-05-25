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
import { SafeResourceUrlPipe } from '../../../pipe/safe-resource-url.pipe';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-courses-details',
  templateUrl: './courses-details.component.html',
  styleUrls: ['./courses-details.component.scss'],
  imports: [
    LoadingSpinnerComponent,
    CommonModule,
    LayoutTemplateComponent,
    SafeResourceUrlPipe,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatDividerModule
  ],
  standalone: true,
})
export class CoursesDetailsComponent implements OnInit {
  course: Course | undefined;
  isLoading$: Observable<boolean> | undefined;
  private destroy$ = new Subject<void>();

  constructor(
    private readonly store: Store,
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer
  ) {}

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

  isPdf(url: string): boolean {
    const [path] = url.split('?');
    return path.toLowerCase().endsWith('.pdf');
  }

  isOfficeDoc(url: string): boolean {
    const [path] = url.split('?');
    return /\.(docx|doc|pptx|xls|xlsx)$/i.test(path);
  }

  // officeViewerUrl(url: string): SafeResourceUrl {
  //   const base = 'https://view.officeapps.live.com/op/embed.aspx';
  //   const params = new URLSearchParams({
  //     src: url,
  //     wdLocale: 'en-US', // force US English
  //     ui: 'en-US', // force English UI
  //     Embed: '1', // ensures embed mode
  //   }).toString();

  //   return this.sanitizer.bypassSecurityTrustResourceUrl(`${base}?${params}`);
  // }

  googleViewerUrl(url: string): SafeResourceUrl {
    const viewer = 'https://docs.google.com/gview?embedded=true&url=';
    return this.sanitizer.bypassSecurityTrustResourceUrl(
      viewer + encodeURIComponent(url)
    );
  }
}
