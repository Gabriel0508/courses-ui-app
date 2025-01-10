import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  collapsed: boolean = true;
  searchCourseForm: FormGroup = new FormGroup({});
  modalRef?: BsModalRef;

  constructor(
    public translate: TranslateService,
    private fb: FormBuilder,
    private modalService: BsModalService
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

  openLanguageModal(viewUserTemplate: TemplateRef<any>) {
    this.modalRef = this.modalService.show(viewUserTemplate, {
      backdrop: 'static',
      ignoreBackdropClick: true,
      keyboard: false,
      animated: true,
    });
  }

  private initSearchCourseForm(): void {
    this.searchCourseForm = this.fb.group({
      searchCourse: [''],
    });
  }
}
