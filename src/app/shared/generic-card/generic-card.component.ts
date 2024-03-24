import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Item } from 'src/app/core/models/item.model';

@Component({
  selector: 'app-generic-card',
  templateUrl: './generic-card.component.html',
  styleUrls: ['./generic-card.component.scss']
})
export class GenericCardComponent {
 @Input() courses: Item[] | null = []; //TODO: check if null is needed (use better approach)
 @Input() id: string = ''; //TODO: check how to do it in a better way
 @Output() openCourse = new EventEmitter<string>();

 onOpenCourse(): void {
   this.openCourse.emit(this.id);
 }
}
