import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { BreakpointObserver } from '@angular/cdk/layout';
import { AuthService } from 'src/app/core/services/auth.service';
import { select, Store } from '@ngrx/store';
import { AuthActions } from 'src/app/state/authentication/auth.actions';
import { selectCurrentUser } from 'src/app/state/authentication/auth.selector';
import { Observable, Subscription } from 'rxjs';
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
    MatListModule,
  ],
  standalone: true,
})
export class HeaderComponent {
  collapsed: boolean = true;
  searchCourseForm: FormGroup = new FormGroup({});
  user$: Observable<User | null>;
  userSubscription: Subscription | undefined;

  isMobile = true;
  isCollapsed = true;

  constructor(
    public translate: TranslateService,
    private observer: BreakpointObserver,
    private authService: AuthService,
    private router: Router,
    private readonly store: Store,
  ) {
    this.user$ = this.store.pipe(select(selectCurrentUser))
    translate.addLangs(['en', 'de']);
    translate.setDefaultLang('en');
  }

  onCollapsedNav() {
    this.collapsed = !this.collapsed;
  }

  onSwitchLang(lang: string) {
    this.translate.use(lang);
  }

  onLogout() {
    this.store.dispatch(AuthActions.logout());
  }
}
