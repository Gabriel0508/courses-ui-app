import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Course } from 'src/app/core/models/course.model';

@Component({
  selector: 'app-generic-card',
  templateUrl: './generic-card.component.html',
  styleUrls: ['./generic-card.component.scss'],
  standalone: true
})
export class GenericCardComponent {
  @Input() courses!: Course[];
  @Input() id: number | undefined;
  @Output() openCourse = new EventEmitter<number>();

  constructor(private sanitizer: DomSanitizer) {}

  onOpenCourse(): void {
    this.openCourse.emit(this.id);
  }
}
