import { Component, NgZone, OnInit } from '@angular/core';
// import { Map, View } from 'ol';
import { Coordinate } from 'ol/coordinate';
// import { Point } from 'ol/geom';
// import { Layer, Tile } from 'ol/layer';
// import VectorLayer from 'ol/layer/Vector';
import { fromLonLat } from 'ol/proj';
// import { OSM } from 'ol/source';
// import Feature from "ol/Feature";
// import VectorSource from 'ol/source/Vector';
// import { Icon, Style } from "ol/style";
import Feature from 'ol/Feature';
import Map from 'ol/Map';
import Overlay from 'ol/Overlay';
import Point from 'ol/geom/Point';
import TileJSON from 'ol/source/TileJSON';
import VectorSource from 'ol/source/Vector';
import View from 'ol/View';
import { Icon, Style } from 'ol/style';
import { Tile, Vector as VectorLayer } from 'ol/layer';
import { OSM } from 'ol/source';
import GeometryLayout from 'ol/geom/GeometryLayout';
import { features } from 'process';
import { LineString } from 'ol/geom';
import { MapBrowserEvent } from 'ol';


@Component({
  selector: 'app-ol-map2',
  templateUrl: './ol-map2.component.html',
  styleUrls: ['./ol-map2.component.scss']
})
export class OlMap2Component {
  Map: Map;
  Markers: Coordinate[];
  startCord: Coordinate = null;
  endCord: Coordinate = null;

  constructor(private zone: NgZone) { }

  ngAfterViewInit(): void {
    if (!this.Map) {
      this.zone.runOutsideAngular(() => {
        this.Map = new Map({
          view: new View({ center: [85.33903982400871, 27.66624952176038], projection: 'EPSG:4326', zoom: 15 }),
          target: 'map',
          layers: [new Tile({ source: new OSM() }), new VectorLayer({
            source: new VectorSource()
          })],
        });
      });
      this.Map.on('click', this.MapClickHandler);
    }
  }


  MapClickHandler = (event: MapBrowserEvent) => {
    let clickCords = event.coordinate;
    let setcord = () => {
      if (!this.startCord) { this.startCord = clickCords; return; }
      this.endCord = this.startCord;
      this.startCord = clickCords;
      return;
    }
    setcord();
    this.addMarkers();
    this.addRoute();
  }

  addMarkers() {
    let pointersLayer = new VectorLayer({
      source: new VectorSource({
        features: [
          new Feature({
            geometry: new Point(this.startCord || null),
            name: "StartCord"
          }),
          new Feature({
            geometry: new Point(this.endCord || this.startCord),
            name: "EndCord"
          })
        ]
      }),
      style: (feature) => {
        let iconSrc = `assets/${feature.get('name')||'StartCord'}.png`;
        return new Style({
          image: new Icon({
            src: iconSrc,
            scale: 0.5,
            anchor: [0.5, 1]
          })
        })
      }
    });
    this.Map.getLayers().setAt(1, pointersLayer);

  }

  addRoute() {
    if (!this.startCord || !this.endCord) return;
    let routeFeature = new Feature();
    let cords = [this.startCord, this.endCord];
    let geometry = new LineString(cords);
    routeFeature.setGeometry(geometry);
    let routeLayer = new VectorLayer({
      source: new VectorSource({
        features: [routeFeature]
      })
    });
    this.Map.getLayers().setAt(2, routeLayer);
    // console.log(this.Map.getLayers().getArray());
  }





}
