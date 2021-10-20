import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { AuthGuard } from './core/routeGuards/auth/auth.guard';
import { LaunchNavigator } from '@ionic-native/launch-navigator/ngx';

import { IonicStorageModule } from '@ionic/storage';
import { Network } from '@ionic-native/network/ngx';
import { CopingStrategiesService } from './core/services/coping-strategies/coping-strategies.service';
import { WarningSignsService } from './core/services/warning-signs/warning-signs.service';
import { UpdateCopingStrategyService } from './core/services/coping-strategies/update-coping-strategy.service';
import { UpdateWarningSignService } from './core/services/warning-signs/update-warning-sign.service';
import { UpdateContactService } from './core/services/contacts/update-contact.service';
import { ContactService } from './core/services/contacts/contact.service';
import { PlaceService } from './core/services/places/place.service';
import { SQLite } from '@ionic-native/sqlite/ngx';
 
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { GetHelpComponent } from './shared/get-help/get-help.component';

/* Add Amplify imports */
import { AgmCoreModule } from '@agm/core';
import { AppAvailability } from '@ionic-native/app-availability/ngx';

@NgModule({
  declarations: [
    AppComponent
  ],
  entryComponents: [],
  imports: [
    BrowserModule, 
    IonicModule.forRoot({
      backButtonText: ''
    }),
    AppRoutingModule, 
    BrowserAnimationsModule,
    HttpClientModule,
    HttpClientModule,
    IonicStorageModule.forRoot(),
    ServiceWorkerModule.register("ngsw-worker.js", {
      enabled: environment.production,
      registrationStrategy: "registerImmediately"
    }),  
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDER16t6Erih2cQQzSyPI50sKtQ1EVcyPc',
      libraries: ['places']
    })
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AuthGuard,
    Network,
    CopingStrategiesService,
    WarningSignsService,
    UpdateCopingStrategyService, 
    UpdateWarningSignService,
    UpdateContactService,
    ContactService,
    PlaceService,
    LaunchNavigator,
    AppAvailability,
    SQLite,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
//TODO: Move all services to a shared module and get them out of here
export class AppModule {}
