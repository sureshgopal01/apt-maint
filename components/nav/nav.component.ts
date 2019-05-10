import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AuthenticationService } from '../../services/authentication.service';


@Component({
  selector: 'top-nav',
  templateUrl: './nav.component.html'
})
export class NavComponent implements OnInit {

  isLoggedIn$: boolean;

  constructor(private authService: AuthenticationService) { }

  ngOnInit() {
    this.isLoggedIn$ = this.authService.isLoggedIn;
  }

  onLogout() {
    this.authService.logout();
}

}
