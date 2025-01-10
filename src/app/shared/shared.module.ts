import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { BannerComponent } from './banner/banner.component';
import { GenericCardComponent } from './generic-card/generic-card.component';
import { TranslateModule } from '@ngx-translate/core';
import { FooterComponent } from './footer/footer.component';
import { ModalComponent } from './modal/modal.component';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { ComponentsModule } from '../components/components.module';

@NgModule({
  declarations: [
    HeaderComponent,
    BannerComponent,
    GenericCardComponent,
    FooterComponent,
    ModalComponent,
    LoadingSpinnerComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    TranslateModule,
  ],
  providers: [BsModalRef],
  exports: [
    HeaderComponent,
    BannerComponent,
    GenericCardComponent,
    FooterComponent,
    ModalComponent,
    LoadingSpinnerComponent,
  ],
})
export class SharedModule {}
