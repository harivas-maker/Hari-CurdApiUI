import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  constructor(private router: Router) {}

  logout() {
    // You can clear session storage or any auth flags
    sessionStorage.clear();
    this.router.navigate(['/login']);
  }
  navigateToHome(){
    sessionStorage.clear();
    this.router.navigate(['/dashboard']);
  }
}
