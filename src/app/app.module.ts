import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/database';

import { PagesModule } from './pages/pages.module';
import { CoreModule } from './core/core.module';

import { ScreenService } from './services/screen/screen.service';
import { AuthService } from './services/auth/auth.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    AngularFireModule.initializeApp(environment.firebase, 'karma'),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    BrowserAnimationsModule,
    PagesModule,
    CoreModule
  ],
  providers: [
    ScreenService,
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
