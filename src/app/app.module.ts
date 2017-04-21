import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {RouterModule, Routes, CanActivate} from '@angular/router';
import { FacebookService, FacebookModule} from 'ng2-facebook-sdk';
import {NgxPaginationModule} from 'ngx-pagination';
import { AngularFireModule } from 'angularfire2';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AlbumsComponent } from './albums/albums.component';
import {AuthService} from './auth.service';
import { PhotosComponent } from './photos/photos.component';
import { AlphabetSortPipePipe } from './alphabet-sort-pipe.pipe';
import { NoAlbumComponent } from './no-album/no-album.component'
import { AuthGuard } from "./can-activate.service";
import { LoginGuard } from "./already-logged.service";
/*******************************************
** Firebase Configuration from the console **
*******************************************/
export const firebaseConfig = {
    apiKey: "AIzaSyD9Jvp7yJilnP_Lt-a_Exc4Eawaf69Q2Ak",
    authDomain: "newapp-ce700.firebaseapp.com",
    databaseURL: "https://newapp-ce700.firebaseio.com",
    projectId: "newapp-ce700",
    storageBucket: "newapp-ce700.appspot.com",
    messagingSenderId: "132886190010"
};
const ROUTES : Routes = [
    {
        path: '',
        redirectTo: 'Accounts/Login',
        pathMatch: 'full'
    },
    {
        path: 'Accounts/Login',
        component: LoginComponent,
        canActivate: [LoginGuard]
    },
    {
        path: 'Accounts/Albums',
        component: AlbumsComponent,
        canActivate: [AuthGuard],
        children : [
            {
                path: '',
                component: NoAlbumComponent
            },
            {
                path: ':id',
                component: PhotosComponent
            }
        ]
    },
    { 
        path: '**',
        component: NotFoundComponent
    }
];
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NotFoundComponent,
    NavbarComponent,
    AlbumsComponent,
    PhotosComponent,
    AlphabetSortPipePipe,
    NoAlbumComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(ROUTES),
    FacebookModule.forRoot(),
    NgxPaginationModule,
    AngularFireModule.initializeApp(firebaseConfig)
  ],
  providers: [AuthService,FacebookService, AuthGuard, LoginGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
