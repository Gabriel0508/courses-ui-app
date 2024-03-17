import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { BannerComponent } from './banner/banner.component';
import { GenericCardComponent } from './generic-card/generic-card.component';


@NgModule({
  declarations: [
    HeaderComponent,
    BannerComponent,
    GenericCardComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    RouterModule,
    ReactiveFormsModule
  ],
  exports: [HeaderComponent, BannerComponent, GenericCardComponent]
})
export class SharedModule { }
