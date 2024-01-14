import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from "./services/auth.service";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  title = 'angular client';
  private isAuthenticated: boolean = false;
  private username: string | null = null;

  constructor(public authService: AuthenticationService) {}

  ngOnInit() {
  }

  ngOnDestroy() {
  }
  getUsername(): string | null {
    return this.username;
  }
}
