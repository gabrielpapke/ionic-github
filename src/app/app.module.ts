import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ReposPage } from '../pages/repos/repos';
import { RepoDetailPage } from '../pages/repo-detail/repo-detail';
import { UserPage } from '../pages/user/user';


import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

// import { UtilsService } from "../utils/utils.service";
import { UsersService } from "./users/users.service";
import { ReposService } from "./repos/repos.service";

// rxjs operator
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import "rxjs/add/operator/switchMap";

// rxjs extensions
import "rxjs/add/Observable/of";import 'rxjs/add/Observable/throw';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ReposPage,
    RepoDetailPage,
    UserPage
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ReposPage,
    RepoDetailPage,
    UserPage
  ],
  providers: [
    UsersService,
    ReposService,
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler, }
  ]
})
export class AppModule {}
