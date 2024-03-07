import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { ComponentsModule } from './components/components.module';
import { ItemsComponent } from './components/items/items.component';
import { HttpClientModule } from '@angular/common/http';

const routes: Routes = [
  { path: '',  component: LandingPageComponent},
  { path: 'items',  component: ItemsComponent},
];

@NgModule({
  declarations:[],
  imports: [RouterModule.forRoot(routes), ComponentsModule, HttpClientModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
