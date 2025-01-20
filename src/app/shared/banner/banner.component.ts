import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss'],
  standalone: true,
})
export class BannerComponent {
  @Output() navigateToCourses = new EventEmitter<string>();

  onNavigateToCourses(url: string): void {
    this.navigateToCourses.emit(url);
  }
}
