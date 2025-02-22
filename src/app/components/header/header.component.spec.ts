import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let translateService: TranslateService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      imports: [ReactiveFormsModule, TranslateModule.forRoot()],
      providers: [TranslateService],
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    translateService = TestBed.inject(TranslateService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize collapsed to true', () => {
    expect(component.collapsed).toBe(true);
  });

  it('should toggle collapsed value when onCollapsedNav is called', () => {
    const initialCollapsedValue = component.collapsed;
    component.onCollapsedNav();
    expect(component.collapsed).toBe(!initialCollapsedValue);
  });

  it('should initialize searchCourseForm on ngOnInit', fakeAsync(() => {
    component.ngOnInit();
    tick();
    expect(component.searchCourseForm).toBeDefined();
    expect(component.searchCourseForm.get('searchCourse')).toBeDefined();
  }));

  it('should toggle collapsed state on onCollapsedNav', () => {
    const initialState = component.collapsed;
    component.onCollapsedNav();
    fixture.detectChanges();
    expect(component.collapsed).toBe(!initialState);
    component.onCollapsedNav();
    expect(component.collapsed).toBe(initialState);
  });

  it('should switch language on onSwitchLang', fakeAsync(() => {
    const spy = jest.spyOn(translateService, 'use');
    const lang = 'de';
    component.onSwitchLang(lang);
    tick();
    expect(spy).toHaveBeenCalledWith(lang);
  }));
});
