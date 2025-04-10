import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { select, Store } from '@ngrx/store';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { LanguageActions } from 'src/app/state/language/language.actions';
import { selectAvailableLanguage } from 'src/app/state/language/language.selector';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  imports: [CommonModule, TranslateModule, MatFormFieldModule, MatSelectModule],
})
export class FooterComponent {
  availableLanguages$ = this.store.pipe(select(selectAvailableLanguage));

  constructor(
    public translate: TranslateService,
    private readonly store: Store
  ) {}

  onSwitchLang(selectedLanguage: string): void {
    this.store.dispatch(
      LanguageActions.setLanguage({ language: selectedLanguage })
    );
  }
}
