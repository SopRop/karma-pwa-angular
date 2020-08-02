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

import { AdminModule } from './admin/admin.module';
import { PagesModule } from './pages/pages.module';
import { CoreModule } from './core/core.module';

import { ScreenService } from './services/screen/screen.service';
import { AuthService } from './services/auth/auth.service';

import { AuthGuard } from './guards/auth.guard';
import { SecureInnerPagesGuard } from './guards/secure-inner-pages.guard';

import { Entry } from './services/entry/entry';
import { Question } from './services/question/question';

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
    CoreModule,
    AdminModule
  ],
  providers: [
    ScreenService,
    AuthService,
    AuthGuard,
    SecureInnerPagesGuard,
    Entry,
    Question
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
