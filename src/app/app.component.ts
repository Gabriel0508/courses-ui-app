import { Component } from '@angular/core';
import { HeaderComponent } from "./components/header/header.component";
import { Router, NavigationEnd, RouterModule } from '@angular/router';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    standalone: true,
    imports: [HeaderComponent, RouterModule]
})
export class AppComponent {
  showHeader = true;
  private hiddenRoutes = ['/login', '/register'];

  constructor(private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.showHeader = !this.hiddenRoutes.includes(event.url);
      }
    });
  }
}
