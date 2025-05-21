import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatTabNavPanel, MatTabsModule } from '@angular/material/tabs';
import { RouterModule } from '@angular/router';

export type Tab = 'all' | 'newest' | 'popular';

@Component({
  selector: 'app-courses-header',
  imports: [MatButtonModule, MatTabsModule, RouterModule, MatTabNavPanel],
  standalone: true,
  templateUrl: './courses-header.component.html',
  styleUrl: './courses-header.component.scss',
})
export class CoursesHeaderComponent {
  @Input() activeTab: Tab = 'all';
  @Output() tabChange = new EventEmitter<Tab>();

  tabs: { label: string; value: Tab }[] = [
    { label: 'All Courses', value: 'all' },
    { label: 'The Newest', value: 'newest' },
    { label: 'Most Popular', value: 'popular' },
  ];

  onSelectTab(value: Tab) {
    this.activeTab = value;
    this.tabChange.emit(value);
  }
}
