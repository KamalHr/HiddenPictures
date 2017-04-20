import { Component, OnInit, Pipe } from '@angular/core';
import {AuthService} from '../auth.service';
import { Router } from '@angular/router';
import {FacebookService, LoginResponse, LoginOptions, UIResponse, InitParams, UIParams, FBVideoComponent} from 'ng2-facebook-sdk';
import {AlphabetSortPipePipe} from '../alphabet-sort-pipe.pipe';
declare var $:any;
declare var Materialize:any;
@Component({
  selector: 'app-albums',
  templateUrl: './albums.component.html',
  styleUrls: ['./albums.component.css']
})
export class AlbumsComponent implements OnInit {
    isLoading : Boolean = false;
 	profile : any;
 	albums = [];

  	constructor(private _auth: AuthService, private _router: Router, private Fb: FacebookService) {
  		
  	}
	ngOnInit() {
        this.isLoading = true;
  		this._auth.getAlbums()
        .then((res) => {
            this.albums = res.data;
            setTimeout(() => {
                this.isLoading = false;
            },4000);
        })
        .catch((err) => {
            console.log(err);
            this._router.navigate(['/Accounts/Login']);
        });
	}

}
