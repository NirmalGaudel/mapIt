import { Component ,EventEmitter} from '@angular/core';

import { Coordinate } from 'ol/coordinate';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  mapOneShown = false;
  title = 'Client';
  lat:number = 27.666666;
  lng:number = 85.33944;
  points:Array<Coordinate>;
  showPointers = new EventEmitter <Coordinate[]> ();


  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.points = [[this.lat,this.lng],[27.668850421457428, 85.33660296750222],[27.677891482228564, 85.34785307295405]];
    setTimeout(() => {
      this.showPointers.emit(this.points);
    }, 1000);
 
  }

  addPointer(){ 
    let cords = Array.from(prompt("Lat,Lon ?").split(',').map(str=> parseFloat(str)));
    if(cords.length!=2 || isNaN(cords[0]) || isNaN(cords[1])) return;
    this.points.push(cords);
    this.showPointers.emit(this.points);
  }

  resetPointers(){
    this.points =  [[this.lat,this.lng]];
    this.showPointers.emit(this.points);
  }


}
