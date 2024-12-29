import { Component } from '@angular/core';
import { Router, NavigationEnd, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs/operators';
import { NavbarComponent } from "./shared/layouts/navbar/navbar.component";
import { FooterComponent } from "./shared/layouts/footer/footer.component";
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [NavbarComponent, FooterComponent, RouterOutlet],
  providers: [Router, HttpClient]
})
export class AppComponent {
  showHeaderFooter: boolean = true;

  constructor(private router: Router) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.showHeaderFooter = !(event.url === '/login' || event.url === '/register');
    });
  }
}