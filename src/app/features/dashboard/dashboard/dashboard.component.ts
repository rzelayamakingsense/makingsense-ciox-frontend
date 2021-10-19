import { Component, OnInit } from '@angular/core';
import { OktaAuth } from '@okta/okta-auth-js';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  isAuthenticated: boolean = false;
  userName: string | undefined = "";

  constructor(public oktaAuth: OktaAuth) { }

  async ngOnInit() {
    this.isAuthenticated = await this.oktaAuth.isAuthenticated();
    if (this.isAuthenticated) {
      const userClaims = await this.oktaAuth.getUser();
      this.userName = userClaims.name;
    }
  }

}
