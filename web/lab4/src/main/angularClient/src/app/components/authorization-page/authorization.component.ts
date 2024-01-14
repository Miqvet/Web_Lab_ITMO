import {Component, ElementRef, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthenticationService} from "../../services/auth.service";
import {CoordinatesService} from "../../services/coordinates.service";
import {AppComponent} from "../../app.component";
import {Router} from "@angular/router";
@Component({
  selector: 'app-authorization',
  templateUrl: './authorization.component.html',
  styleUrls: ['../authorization-page/authorization.component.css']
})
export class AuthorizationComponent implements OnInit {

  constructor(private router: Router, private coordsService: CoordinatesService, private appComponent: AppComponent, public authService: AuthenticationService) {}

  onRegister(): void{
    if (this.userForm.valid) {
      console.log("Процесс регистрации")
      fetch("http://localhost:8080/api/users/register", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: this.userForm.value.login,
          password: this.userForm.value.password
        })
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('Registration failed');
          }
          console.log("Пользователь Зарегистрирован")
        })
        .catch(error => {
          console.log(error);
        })
    }

  }

  onLogin(username: string, password: string) {
    fetch("http://localhost:8080/api/users/login", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: username,
        password: password
      })
    }).then(response => {
        if (!response.ok) {
          console.log(response.status);
          throw new Error('Login failed');
        }
        return response.text();
      }).then(token => {
        this.authService.setUsername(username);
        this.authService.setToken(token);
        console.log("All ok");
        console.log(token);
        this.router.navigate(["main"]);
      })
      .catch(error => {
        console.log(error);
      })
  }
  userForm: FormGroup = new FormGroup({
    login: new FormControl('',[Validators.required,Validators.pattern("[a-zA-Z0-9]+")]),
    password: new FormControl('', [Validators.required, Validators.pattern("[0-9]{1,5}")])
  })
  onSubmit() {
    if (this.userForm.valid) {
      console.log("Процесс авторизации")
      this.onLogin(this.userForm.value.login, this.userForm.value.password)
    }
  }
  ngOnInit(): void {
    console.log(this.authService.getUsername())
  }
  goHome(): void{
    this.router.navigate(["main"]);
  }

}


