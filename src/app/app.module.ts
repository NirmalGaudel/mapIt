import { AgmCoreModule } from '@agm/core';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './Pages/auth/auth.module';
import { OlMapComponent } from './ol-map/ol-map.component';
import { OlMap2Component } from './ol-map2/ol-map2.component';

@NgModule({
  declarations: [
    AppComponent,
    OlMapComponent,
    OlMap2Component
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthModule,
    AgmCoreModule.forRoot({
      apiKey:environment.googleMapsApiKey,
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
