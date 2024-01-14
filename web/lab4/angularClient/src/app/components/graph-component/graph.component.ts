import {
  Component,
  ViewChild,
  ElementRef,
} from '@angular/core';
import {CoordinatesService} from "../../services/coordinates.service";
import {AppComponent} from "../../app.component";
import {Point} from "../../models/Point";
import {Router} from "@angular/router";
import {AuthenticationService} from "../../services/auth.service";

@Component({
  selector: 'graph',
  templateUrl: './graph.component.html',
  styleUrls:['graph.component.scss']
})
export class GraphComponent{
  @ViewChild('canvas') canvasRef: ElementRef;
  @ViewChild('resultsTable') tableRef: ElementRef;

  currentRValue: number = 1;

  private ctx: CanvasRenderingContext2D

  private username: string | null = null;

  constructor(private router: Router,private coordinatesService: CoordinatesService, public authServ: AuthenticationService, private appComponent: AppComponent) {
    this.username = authServ.getUsername();
    console.log(this.canvasRef)
    console.log(this.username)
    console.log(456765)
  }
  goHome(): void{
    this.router.navigate([""]);
  }
  ngOnDestroy(): void {
  }
  ngAfterViewInit(): void {
  }
  restorePoint(point: Point){
  }
  makeDBRequest(){
  }
  showData(): void{
    console.log("start update all data")
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
      this.updateTable(data);
      this.initCanvasAndRestorePoints(data);
    }).catch(error =>{
      console.error('Error fetching user data:', error);
    });
  }

  private initCanvasAndRestorePoints(points: Point[]) {
    const canvas = this.canvasRef.nativeElement;
    const context = canvas.getContext('2d');
    if (!context) {
      throw new Error('Failed to get 2D context');
    }
    this.ctx = context;
    this.drawCoordsPlane(this.currentRValue);
    this.drawPoints(points);
  }

  updateRValue(r: number): void {
    this.currentRValue = r;
    this.clearCanvas();
    this.showData();
  }

  clearCanvas(){
    if (this.ctx){
      this.drawCoordsPlane(this.currentRValue);
    }
  }

  drawPoint(xVal:number, yVal:number, rVal:number, result:string){
    let color = (result === 'In' ? "rgb(39,252,1)" : 'rgb(255,0,0)');
    if(result=="undefined"){
      color = "rgb(155,155,155)";
    }
    const pointSize = 10;
    this.ctx.beginPath();
    const canvasCoords = this.toCanvasCoords(xVal, yVal, rVal,230);
    this.ctx.arc(canvasCoords.x, canvasCoords.y, pointSize/2, 0, Math.PI * 2);
    this.ctx.fillStyle = color;
    this.ctx.fill();
  }
  drawPoints(points: Point[]): void{
    let buffForR =  Math.abs(this.currentRValue);
    if (buffForR == 0){
      buffForR = 1;
    }
    points.forEach((point) =>{
      if(point.r == buffForR) {this.drawPoint(point.x, point.y, point.r, point.result);}
    });
  }

  drawCoordsPlane(valueR: number = 1){
    if(valueR < 0){
      valueR = -valueR;
    }
    if(valueR == 0){
      valueR = 1;
    }
    const halfR = valueR/2;
    this.canvasRef.nativeElement.width = 230;
    this.canvasRef.nativeElement.height = 230;
    const indent = 17;
    const textIndent = 7;
    const halfWidth = this.canvasRef.nativeElement.width / 2;
    const halfHeight = this.canvasRef.nativeElement.height / 2;
    const r = this.canvasRef.nativeElement.width / 2 - indent;
    const arrowSize = 5;
    const neonBlue = "rgba(21,113,220,0.5)";
    const neonPink = "rgba(65,105,225,0.5)";
    const neonGreen = "rgba(65,105,225,0.5)";
    // Стрелочки для осей
     this.ctx.moveTo(this.canvasRef.nativeElement.width- arrowSize, halfHeight - arrowSize);
     this.ctx.lineTo(this.canvasRef.nativeElement.width - 1, halfHeight);
     this.ctx.lineTo(this.canvasRef.nativeElement.width - arrowSize, halfHeight + arrowSize);

     this.ctx.moveTo(halfWidth - arrowSize, arrowSize);
     this.ctx.lineTo(halfWidth, 1);
     this.ctx.lineTo(halfWidth + arrowSize, arrowSize);
     this.ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--axes-color').trim();
     this.ctx.stroke();

     this.ctx.fillStyle = neonBlue;
    //3rd quarter - square
     this.ctx.fillRect(indent, this.canvasRef.nativeElement.height - indent, r, -r);

    //4th quarter - 1/4 circle
     this.ctx.beginPath();
     this.ctx.arc(halfWidth, halfHeight, r, Math.PI* 3/ 2, 0);
     this.ctx.lineTo(halfWidth, halfHeight);
     this.ctx.fill();

    //1st quarter - triangle
     this.ctx.beginPath();
     this.ctx.moveTo(halfWidth, halfHeight + r/2);
     this.ctx.lineTo(halfWidth + r, halfHeight);
     this.ctx.lineTo(halfWidth, halfHeight);
     this.ctx.closePath();
     this.ctx.fill();

     this.ctx.fillStyle = 'rgb(0,0,0)';
     this.ctx.beginPath();
     this.ctx.font = "14px Arial";
     this.ctx.fillText('y', halfWidth + textIndent, textIndent);
     this.ctx.fillText('x', this.canvasRef.nativeElement.width - textIndent, halfHeight - textIndent);

     this.ctx.fillText('' +halfR, halfWidth + textIndent, halfHeight-r/2  + textIndent/2);
     this.ctx.moveTo(halfWidth - 4, halfHeight-r/2 );
     this.ctx.lineTo(halfWidth  + 4, halfHeight-r/2);
     this.ctx.fillText(''+valueR, halfWidth + textIndent, halfHeight - r + textIndent /2);
     this.ctx.moveTo(halfWidth - 4 , halfHeight - r);
     this.ctx.lineTo(halfWidth + 4, halfHeight - r );

    this.ctx.fillText(halfR + "", halfWidth + r/2 - textIndent, halfHeight-textIndent);
    this.ctx.moveTo(halfWidth  + r / 2 , halfHeight - 4);
    this.ctx.lineTo(halfWidth + r/ 2, halfHeight + 4);
    this.ctx.fillText(valueR+ "", halfWidth + r - textIndent/2 + 3, halfHeight-textIndent);
    this.ctx.moveTo(halfWidth  +r , halfHeight - 4);
    this.ctx.lineTo(halfWidth + r, halfHeight + 4);

    this.ctx.fillText("-"+halfR,  halfWidth - r/2 - textIndent, halfHeight - textIndent);
    this.ctx.moveTo(halfWidth - r/2, halfHeight - 4);
    this.ctx.lineTo(halfWidth - r/2, halfHeight  +4);
    this.ctx.fillText("-"+valueR, indent - textIndent / 2, halfHeight-textIndent);
     this.ctx.moveTo(halfWidth - r, halfHeight  - 4);
     this.ctx.lineTo(halfWidth - r, halfHeight  + 4);

     this.ctx.fillText("-"+valueR, halfWidth + textIndent, halfHeight + r + textIndent / 2);
     this.ctx.moveTo(halfWidth - 4, halfHeight + r);
     this.ctx.lineTo(halfWidth + 4, halfHeight  + r);
     this.ctx.fillText("-"+halfR, halfWidth + textIndent, halfHeight + r/2  + textIndent / 2);
     this.ctx.moveTo(halfWidth - 4 , halfHeight + r/2);
     this.ctx.lineTo(halfWidth + 4, halfHeight +r/2 );
     this.ctx.stroke();
    // оси
     this.ctx.fillStyle = 'rgba(0,0,0)';
     this.ctx.beginPath();
     this.ctx.moveTo(0, halfHeight);
     this.ctx.lineTo(this.canvasRef.nativeElement.width, halfHeight);
     this.ctx.moveTo(halfWidth, 0);
     this.ctx.lineTo(halfWidth,this.canvasRef.nativeElement.height);

     this.ctx.strokeStyle = getComputedStyle(document.documentElement).getPropertyValue('--axes-color').trim();
     this.ctx.stroke();
  }

  toCanvasCoords(x: number, y: number, r: number, canvasSize: number): { x: number; y: number ;r: number}{
    canvasSize -= 34;
    const scale = canvasSize / 2;
    console.log(x,y,r)
    console.log(scale / r * x + scale + 17,canvasSize - (scale / r * y + scale) + 17)
    return {
      x: scale / r * x + scale + 17,
      y: canvasSize - (scale / r * y + scale) + 17,
      r: r
    };
  }

  toNormalCoords(canvasX: number, canvasY: number, r: number, canvasSize: number): {x: number, y: number}{
    canvasY -= 17;
    canvasX -= 17;
    canvasSize -= 34;
    const scale = canvasSize / 2;
    return {
      x: r * (canvasX - scale) / scale,
      y: r * (canvasSize - canvasY - scale) / scale
    }
  }

  addToTable(point: Point){
    const row = this.tableRef.nativeElement.insertRow(1)
    const cell1 = row.insertCell(0)
    const cell2 = row.insertCell(1)
    const cell3 = row.insertCell(2)
    const cell4 = row.insertCell(3)

    cell1.textContent = String(point.x.toFixed(4))
    cell1.className = "new-cell"
    cell2.textContent = String(point.y.toFixed(4))
    cell2.className = "new-cell"
    cell3.textContent = String(point.r)
    cell3.className = "new-cell"
    cell4.textContent = point.result

    if (point.result == "In"){
      cell4.className = "result-cell-in"
    } else {
      cell4.className = "result-cell-out"
    }
  }
  updateTable(points: Point[]): void{
    this.clearTable();
    points.forEach((point) =>{
      this.addToTable(point)
    });
  }
  clearTable(){
    const table = this.tableRef.nativeElement
    while (table.rows.length > 1){
      table.deleteRow(1)
    }
  }

  onCanvasClick(event: MouseEvent): void{
    const rect = this.canvasRef.nativeElement.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    let r = this.currentRValue;
    if(r == 0){
      r = 1;
    }else if (r < 0){
      r = -r;
    }
    const normalCoords = this.toNormalCoords(x, y, r, this.canvasRef.nativeElement.width);
    this.coordinatesService.sendCoordinates(normalCoords.x, normalCoords.y, r);
    this.showData();
    this.drawPoint(normalCoords.x, normalCoords.y,r,"undefined");
  }
}
