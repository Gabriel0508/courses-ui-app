import { Component, EventEmitter, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { LayoutTemplateComponent } from '../layout-template/layout-template.component';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss'],
  standalone: true,
  imports: [MatButtonModule, LayoutTemplateComponent],
})
export class BannerComponent {
  @Output() navigateToCourses = new EventEmitter<string>();

  onNavigateToCourses(url: string): void {
    this.navigateToCourses.emit(url);
  }
}
