import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { selectCurrentLanguage } from 'src/app/state/language/language.selector';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss'],
  standalone: true,
  imports: [MatButtonModule, TranslateModule],
})
export class BannerComponent implements OnDestroy {
  @Input() imgSrc: string | undefined;
  @Input() title: string | undefined;
  @Input() description: string | undefined;
  @Input() buttonLabel: string | undefined;
  @Output() navigateToCourses = new EventEmitter<string>();
  languageSubscription: Subscription;

  constructor(
    private readonly store: Store,
    private translate: TranslateService
  ) {
    this.languageSubscription = this.store
      .pipe(select(selectCurrentLanguage))
      .subscribe((language) => {
        this.translate.use(language);
      });
  }

  onNavigateToCourses(url: string): void {
    this.navigateToCourses?.emit(url);
  }

  ngOnDestroy(): void {
    if (this.languageSubscription) {
      this.languageSubscription.unsubscribe();
    }
  }
}
