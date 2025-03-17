import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Course } from 'src/app/core/models/course.model';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-generic-card',
  templateUrl: './generic-card.component.html',
  styleUrls: ['./generic-card.component.scss'],
  standalone: true,
  imports: [MatButtonModule, MatCardModule, CommonModule, MatIconModule],
})
export class GenericCardComponent {
  @Input() courses!: Course[];
  @Input() id: number | undefined;
  @Output() openCourse = new EventEmitter<number>();

  constructor() {}

  onOpenCourse(): void {
    this.openCourse.emit(this.id);
  }
}
