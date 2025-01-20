import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true,
  imports:[CommonModule, RouterModule, ReactiveFormsModule, TranslateModule]
})
export class HeaderComponent implements OnInit {
  collapsed: boolean = true;
  searchCourseForm: FormGroup = new FormGroup({});

  constructor(
    public translate: TranslateService,
    private fb: FormBuilder
  ) {
    translate.addLangs(['en', 'de']);
    translate.setDefaultLang('en');
  }

  ngOnInit(): void {
    this.initSearchCourseForm();
  }

  onCollapsedNav() {
    this.collapsed = !this.collapsed;
  }

  onSwitchLang(lang: string) {
    this.translate.use(lang);
  }

  private initSearchCourseForm(): void {
    this.searchCourseForm = this.fb.group({
      searchCourse: [''],
    });
  }
}
