import {Component, ElementRef, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {CoordinatesService} from "../../services/coordinates.service";
import {numberValidator} from "../../function/numberValidator";

import {AppComponent} from "../../app.component";
import {AuthenticationService} from "../../services/auth.service";
import {GraphComponent} from "../graph-component/graph.component";

@Component({
  selector: 'app-coordinates-form',
  templateUrl: './coordinates-form.component.html',
  styleUrls: ['./coordinates-form.component.css']
})
export class CoordinatesFormComponent implements OnInit {
  numbers: number[] = Array.from({length: 9}, (_, i) => i - 5); // массив от -5 до 3
  @Output() rChanged: EventEmitter<number> = new EventEmitter<number>()

  onSelectR() {
    if (this.coordinatesForm.controls['r'].valid){
      const rValue = this.coordinatesForm.get('r')?.value;
      console.log(rValue)
      // @ts-ignore
      this.rChanged.emit(rValue)
      //@ts-ignore
      sessionStorage.setItem("r", rValue);
    }
    else{
      console.log('Error!!')
    }
  }

  coordinatesForm = new FormGroup({
    x: new FormControl(sessionStorage.getItem('x'), [Validators.required]),
    y: new FormControl(sessionStorage.getItem('y'), [Validators.required, Validators.pattern("^[-]{0,1}[012345]+[.]{0,1}[0123456789]*"), Validators.max(5), Validators.min(-3)]),
    r: new FormControl(sessionStorage.getItem('r'), [Validators.required]),
  })

  get x() {return this.coordinatesForm.controls.x}
  get y(){return this.coordinatesForm.controls.y}
  get r() {return this.coordinatesForm.controls.r}

  constructor(private graphComponent: GraphComponent, private appComponent: AppComponent, private coordinateServ: CoordinatesService, ) {
  }

  explodeAtomic() {
    this.coordinateServ.clearPoints();
  }

  ngOnInit(): void {
    this.coordinateServ.getAllPoints();
  }

  changeX(){
    if(this.coordinatesForm.controls['x'].valid){
      const xValue = this.coordinatesForm.get('x')?.value;
      //@ts-ignore
      sessionStorage.setItem("x", xValue);
    }
  }
  changeY(){
    if(this.coordinatesForm.controls.y.valid){
      //@ts-ignore
      sessionStorage.setItem('y',this.coordinatesForm.value.y)
    }
  }

  onSubmit(){
    if (this.coordinatesForm.valid) {
      //@ts-ignore
      this.coordinateServ.sendCoordinates(this.coordinatesForm.value.x, this.coordinatesForm.value.y,Math.abs(this.coordinatesForm.value.r));
      this.graphComponent.showData();
      //@ts-ignore
      this.graphComponent.drawPoint(this.coordinatesForm.value.x,this.coordinatesForm.value.y,this.coordinatesForm.value.r,"undefined");
      console.log("Запрос на обновление был отправлен");
    }
  }

}
