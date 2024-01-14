import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AuthorizationComponent} from "./components/authorization-page/authorization.component";
import { aboutGuard }   from "./guards/about.guards";
import {NotFoundComponent} from "./components/not-found.component";
import {GraphComponent} from "./components/graph-component/graph.component";

// определение маршрутов
const routes: Routes = [
  { path: '', component: AuthorizationComponent },
  { path: 'main', component: GraphComponent, canActivate: [aboutGuard] },
  { path: "**", component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
