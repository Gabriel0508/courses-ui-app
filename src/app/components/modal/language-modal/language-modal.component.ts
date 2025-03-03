import { CommonModule } from '@angular/common';
import { Component, Inject, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogContent,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { select, Store } from '@ngrx/store';
import { TranslateModule } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { LanguageActions } from 'src/app/state/language/language.actions';
import { selectLanguageMap } from 'src/app/state/language/language.selector';

export interface LanguageData {
  languages: string[];
}

@Component({
  selector: 'app-language-modal',
  imports: [MatListModule, TranslateModule, MatDialogModule, MatButtonModule, MatIconModule, CommonModule, MatDialogContent],
  templateUrl: './language-modal.component.html',
  styleUrl: './language-modal.component.scss',
  standalone: true,
})
export class LanguageModalComponent {
  public dialogRef = inject(MatDialogRef<LanguageModalComponent>);
  languageMap$: Observable<{ [key: string]: string }>;
  
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: LanguageData,
    private readonly store: Store
  ) {
    this.languageMap$ = this.store.pipe(select(selectLanguageMap));
  }

  onLanguageSelected(language: string): void {
    this.store.dispatch(LanguageActions.setLanguage({ language: language }));
    this.dialogRef.close(language);
  }

  onCloseDialog(): void {
    this.dialogRef.close();
  }
}
