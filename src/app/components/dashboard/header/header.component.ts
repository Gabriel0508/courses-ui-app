import { CommonModule } from '@angular/common';
import { Component, OnDestroy } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { MatDrawer, MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { select, Store } from '@ngrx/store';
import { AuthActions } from 'src/app/state/authentication/auth.actions';
import {
  selectCurrentUser,
  selectIsAuthenticated,
  selectIsLoading,
} from 'src/app/state/authentication/auth.selector';
import { Observable, Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { LanguageModalComponent } from '../../modal/language-modal/language-modal.component';
import {
  selectAvailableLanguage,
  selectCurrentLanguage,
} from 'src/app/state/language/language.selector';
import { LanguageActions } from 'src/app/state/language/language.actions';
import { User } from 'firebase/auth';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    RouterModule,
    ReactiveFormsModule,
    TranslateModule,
    MatDividerModule,
    MatListModule],
  standalone: true,
})
export class HeaderComponent implements OnDestroy {
  searchCourseForm: FormGroup = new FormGroup({});
  user$: Observable<User | null>;
  isLoggedIn$: Observable<boolean>;
  isLoading$: Observable<boolean>;
  availableLanguages$ = this.store.pipe(select(selectAvailableLanguage));
  languageSubscription: Subscription;
  isProfileDrawerOpen: boolean = false;

  constructor(
    public translate: TranslateService,
    private readonly store: Store,
    public dialog: MatDialog
  ) {
    this.user$ = this.store.pipe(select(selectCurrentUser));
    this.isLoggedIn$ = this.store.select(selectIsAuthenticated);
    this.isLoading$ = this.store.select(selectIsLoading);
    this.languageSubscription = this.store
      .pipe(select(selectCurrentLanguage))
      .subscribe((language) => {
        this.translate.use(language);
      });
  }

  ngOnDestroy(): void {
    if (this.languageSubscription) {
      this.languageSubscription.unsubscribe();
    }
  }

  onSwitchLang() {
    this.availableLanguages$.subscribe((languages) => {
      const dialogRef = this.dialog.open(LanguageModalComponent, {
        data: { languages: languages },
        disableClose: true,
      });

      dialogRef.afterClosed().subscribe((selectedLanguage: string) => {
        if (selectedLanguage) {
          this.store.dispatch(
            LanguageActions.setLanguage({ language: selectedLanguage })
          );
        }
      });
    });
  }

  onLogout() {
    this.store.dispatch(AuthActions.logout());
  }

  onToggleProfileDrawer(drawer: MatDrawer) {
    this.isProfileDrawerOpen = !drawer.opened;
    drawer.toggle();
  }
}
