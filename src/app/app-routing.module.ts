import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OlMapComponent } from './ol-map/ol-map.component';
import { OlMap2Component } from './ol-map2/ol-map2.component';

const routes: Routes = [
  {path:'',component:OlMapComponent},
  {path:'map2',component:OlMap2Component}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
