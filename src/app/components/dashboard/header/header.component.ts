import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { MatSidenavModule } from '@angular/material/sidenav';
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
import { Observable } from 'rxjs';
import { User } from 'src/app/core/models/user.model';

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
    MatListModule
  ],
  standalone: true,
})
export class HeaderComponent {
  searchCourseForm: FormGroup = new FormGroup({});
  user$: Observable<User | null>;
  isLoggedIn$: Observable<boolean>;
  isLoading$: Observable<boolean>;

  constructor(
    public translate: TranslateService,
    private readonly store: Store
  ) {
    this.user$ = this.store.pipe(select(selectCurrentUser));
    this.isLoggedIn$ = this.store.select(selectIsAuthenticated);
    this.isLoading$ = this.store.select(selectIsLoading);
    translate.addLangs(['en', 'de']);
    translate.setDefaultLang('en');
  }

  onSwitchLang(lang: string) {
    this.translate.use(lang);
  }

  onLogout() {
    if (this.isLoggedIn$) {
      console.log('user logged in', this.isLoggedIn$);

      this.store.dispatch(AuthActions.logout());
    }
  }
}
