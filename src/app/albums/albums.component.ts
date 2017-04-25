import { Component, OnInit, Pipe, Input } from '@angular/core';
import {AuthService} from '../auth.service';
import { Router } from '@angular/router';
import {FacebookService, LoginResponse, LoginOptions, UIResponse, InitParams, UIParams, FBVideoComponent} from 'ng2-facebook-sdk';
import {AlphabetSortPipePipe} from '../alphabet-sort-pipe.pipe';
import {PaginationService} from 'ngx-pagination';

declare var $:any;
declare var Materialize:any;
@Component({
  selector: 'app-albums',
  templateUrl: './albums.component.html',
  styleUrls: ['./albums.component.css'],
  providers: [PaginationService]
})
export class AlbumsComponent implements OnInit {
    isLoading : Boolean = false;
 	profile : any;
 	@Input('data') albums = [];
    pages: number = 1;
  	constructor(private _auth: AuthService, private _router: Router, private Fb: FacebookService) {
  		
  	}
	ngOnInit() {
        this.isLoading = true;
        this.albums.length = 0;
  		this._auth.getAlbums()
        .then((res) => {
            this.albums = res.data;
            setTimeout(() => {
                this.isLoading = false;
            },1000);
        })
        .catch((err) => {
            localStorage.removeItem('token');
            this._router.navigate(['/Accounts/Login']);
        });
	}

}
