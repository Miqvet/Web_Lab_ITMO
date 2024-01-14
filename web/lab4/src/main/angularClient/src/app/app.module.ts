//базовые импорты от ангуляра
import { NgModule }      from "@angular/core";
import { BrowserModule } from '@angular/platform-browser';
import {ReactiveFormsModule} from "@angular/forms";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import { FormsModule } from '@angular/forms';

//Импорты кастомных компонент
import { AppComponent } from './app.component';
import {AuthorizationComponent} from './components/authorization-page/authorization.component';
import {HomeComponent } from './components/home-component/home.component';
//Сервисы
import {AuthenticationService} from './services/auth.service';
import {CoordinatesService} from './services/coordinates.service';
// Другие модули
import { AppRoutingModule } from './app-routing.module';
import {NotFoundComponent} from "./components/not-found.component";
import {CoordinatesFormComponent} from "./components/coordinates-form/coordinates-form.component";
import {GraphComponent} from "./components/graph-component/graph.component";



@NgModule({
  declarations: [
    AppComponent,
    AuthorizationComponent,
    HomeComponent,
    NotFoundComponent,
    CoordinatesFormComponent,
    GraphComponent
  ]
  ,
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [
    AuthenticationService,
    CoordinatesService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
