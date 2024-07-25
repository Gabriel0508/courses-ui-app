import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { ComponentsModule } from './components/components.module';
import { ItemsComponent } from './components/items/items.component';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from './shared/shared.module';
import { ItemsDetailsComponent } from './components/items-details/items-details.component';

const routes: Routes = [
  { path: '', component: LandingPageComponent },
  { path: 'items', component: ItemsComponent },
  { path: 'items/:id', component: ItemsDetailsComponent }
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes),
    ComponentsModule,
    SharedModule,
    HttpClientModule,
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
