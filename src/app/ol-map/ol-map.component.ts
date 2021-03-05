import {Component, NgZone, AfterViewInit, Output, Input, EventEmitter, ChangeDetectorRef } from '@angular/core';
import {View, Feature, Map } from 'ol';
import {Coordinate} from 'ol/coordinate';
import { ScaleLine, defaults as DefaultControls} from 'ol/control';
// import proj4 from 'proj4';
import VectorLayer from 'ol/layer/Vector';
// import Projection from 'ol/proj/Projection';
// import {register}  from 'ol/proj/proj4';
import {get as GetProjection,fromLonLat,transform} from 'ol/proj'
// import fromLonLat from 'ol/proj'
import {Extent} from 'ol/extent';
import Tile from 'ol/layer/Tile';
import {Vector as VectorSource} from 'ol/source'
import OSM, {ATTRIBUTION} from 'ol/source/OSM';
import {Point} from 'ol/geom'

@Component({
  selector: 'app-ol-map',
  templateUrl: './ol-map.component.html',
  styleUrls: ['./ol-map.component.scss']
})
export class OlMapComponent implements  AfterViewInit {

  @Input() center: Coordinate;
  @Input() zoom: number;
  @Input() setPointers:EventEmitter<Coordinate[]>;
//   view: View;
//   projection: Projection;
//   extent: Extent = [-20026376.39, -20048966.10,
// 20026376.39, 20048966.10];
  Map: Map;
  pointersLayer:VectorLayer=null;
  @Output() mapReady = new EventEmitter<Map>();

  pointers:Coordinate[];

  constructor(private zone: NgZone, private cd: ChangeDetectorRef) { }

  ngOnDestroy(): void {
    // this.setPointers.unsubscribe();
  }


  ngAfterViewInit():void {
    if (! this.Map) {
      this.zone.runOutsideAngular(() => this.initMap())
    } 
    setTimeout(()=>this.mapReady.emit(this.Map));
    
    this.setPointers.subscribe(cords=>this.addmarkers(cords));
  }


  private addmarkers(cords:Coordinate[]){
    this.pointers=cords;
    if(this.pointersLayer) this.Map.removeLayer(this.pointersLayer);
    this.pointersLayer = new VectorLayer({
      source: new VectorSource({
          features: cords.map(point=>{
            return new Feature({
              geometry:new Point(fromLonLat([point[1],point[0]]))
            })
          })
      })
  });
  this.Map.addLayer(this.pointersLayer);
  }

  private initMap(): void{
    
    this.Map = new Map({
      target: 'map',
      layers: [
        new Tile({
          source: new OSM()
        })
      ],
      view: new View({
        center: fromLonLat(this.center),
        zoom: this.zoom
      })
    });
    this.Map.on('singleclick', (evt) => {
      console.log(evt);
      
      const newpointer = transform(evt.coordinate, 'EPSG:3857', 'EPSG:4326');
      this.pointers.push([newpointer[1],newpointer[0]]);
      console.log(newpointer,this.pointers);
      
      this.addmarkers(this.pointers);
  });
  }
}