import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Item } from 'src/app/core/models/item.model';

@Component({
  selector: 'app-generic-card',
  templateUrl: './generic-card.component.html',
  styleUrls: ['./generic-card.component.scss'],
})
export class GenericCardComponent {
  @Input() courses!: Item[];
  @Input() id: number | undefined;
  @Output() openCourse = new EventEmitter<number>();

  onOpenCourse(): void {
    this.openCourse.emit(this.id);
  }
}
