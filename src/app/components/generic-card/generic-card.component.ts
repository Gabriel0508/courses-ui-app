import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Course } from 'src/app/core/models/course.model';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-generic-card',
  templateUrl: './generic-card.component.html',
  styleUrls: ['./generic-card.component.scss'],
  standalone: true,
  imports: [MatButtonModule, MatCardModule, CommonModule],
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
