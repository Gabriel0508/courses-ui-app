import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
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
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { LanguageModalComponent } from '../../modal/language-modal/language-modal.component';
import {
  selectAvailableLanguage,
  selectCurrentLanguage,
} from 'src/app/state/language/language.selector';
import { LanguageActions } from 'src/app/state/language/language.actions';
import { User } from 'firebase/auth';
import { AuthService } from 'src/app/core/services/auth.service';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ConfirmationModalComponent } from '../../modal/confirmation-modal/confirmation-modal.component';
import { MatBadgeModule } from '@angular/material/badge';

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
    MatListModule,
    MatFormFieldModule,
    MatInputModule,
    MatBadgeModule,
  ],
  standalone: true,
})
export class HeaderComponent implements OnInit, OnDestroy {
  searchCourseForm: FormGroup = new FormGroup({});
  user: User | null = null;
  availableLanguages$ = this.store.pipe(select(selectAvailableLanguage));
  languageSubscription: Subscription | undefined; //TODO: make a list of subscriptions
  authStateSubscription: Subscription | undefined;
  isProfileDrawerOpen: boolean = false;

  constructor(
    private translate: TranslateService,
    private readonly store: Store,
    private readonly auth: AuthService,
    private dialog: MatDialog,
    private readonly fb: FormBuilder
  ) {
    this.languageSubscription = this.store
      .pipe(select(selectCurrentLanguage))
      .subscribe((language) => {
        this.translate.use(language);
      });
    this.user = this.auth.getUser();
  }

  ngOnInit(): void {
    this.authStateSubscription = this.auth.getAuthState().subscribe((user) => {
      this.user = user;
    });
    this.initSearch();
  }

  ngOnDestroy(): void {
    if (this.languageSubscription || this.authStateSubscription) {
      this.languageSubscription?.unsubscribe();
      this.authStateSubscription?.unsubscribe();
    }
  }

  onSwitchLang() {
    this.availableLanguages$.subscribe((languages) => {
      const dialogRef = this.dialog.open(LanguageModalComponent, {
        data: { languages: languages },
        disableClose: true,
        autoFocus: false,
        restoreFocus: false,
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
    const dialogRef = this.dialog.open(ConfirmationModalComponent, {
      data: {
        title: 'Log out',
        message: 'Are you sure you want to log out?',
      },
      disableClose: true,
      autoFocus: false,
      restoreFocus: false,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result === true) {
        this.store.dispatch(AuthActions.logout());
      }
    });
  }

  onToggleProfileDrawer(drawer: MatDrawer) {
    this.isProfileDrawerOpen = !drawer.opened;
    drawer.toggle();
  }

  private initSearch() {
    this.searchCourseForm = this.fb.group({
      search: [''],
    });
  }
}
