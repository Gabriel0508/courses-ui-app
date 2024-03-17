import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  collapsed: boolean = true;
  searchCourseForm: FormGroup = new FormGroup({});

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initSearchCourseForm();
  }

  onCollapsedNav() {
    this.collapsed = !this.collapsed;
  }

  private initSearchCourseForm(): void {
    this.searchCourseForm = this.fb.group({
      searchCourse: [''],
    });
  }
}
