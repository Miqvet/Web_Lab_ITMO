import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {Point} from "../models/Point";
import {AuthenticationService} from "./auth.service";
import {GraphComponent} from "../components/graph-component/graph.component";

@Injectable({
  providedIn: 'root'
})
export class CoordinatesService{

  constructor(private http: HttpClient, private authServ: AuthenticationService) {
  }

  sendCoordinates(x:number|null|undefined, y:number|null|undefined, r:number|null|undefined): void{
    if(r == 0){
      r = 1;
    }
    const jwtToken = sessionStorage.getItem(this.authServ.getTokenKey());
    const formData = {
      x: x,
      y: y,
      r: r
    };

    fetch('http://localhost:8080/api/shots', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${jwtToken}`
      },
      body: JSON.stringify(formData),
    }).then(response => {
        console.log(response.status)
        if (response.status === 201) {
          return response.json();
        }
        else if (response.status === 401){
          alert("You must Authorization");
          throw new Error("Unauthorized");
        }
        else {
          throw new Error("Unexpected error");
        }
      }).then(data => {
        console.log("data was delivered");
      })
      .catch(error => {
        console.error('Error while form submitting:', error);
      });
  }


  getAllPoints(): void{
    const jwtToken = sessionStorage.getItem(this.authServ.getTokenKey());
    let responseData = fetch("http://localhost:8080/api/shots", {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${jwtToken}`
      },
    }).then(response => {
        console.log(response.status);
        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }
        return response.json();
      }).then(data => {
        console.log(data);
      }).catch(error =>{
        console.error('Error fetching user data:', error);
      });
    console.log(responseData)
  }

  clearPoints(): void{
    const jwtToken = sessionStorage.getItem(this.authServ.getTokenKey());
    fetch('http://localhost:8080/api/shots', {
      method: 'DELETE',
      headers:{
        "Authorization": `Bearer ${jwtToken}`
      }
    }).then(response => {
        console.log(response.status);
        if (response.status !== 204) {
          throw new Error('Network response was not ok');
        }
      })
      .catch(error => {
        console.error('Error while delivery request', error);
      });
  }
}
