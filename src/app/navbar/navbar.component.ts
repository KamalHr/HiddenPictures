import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router'
declare var $: any;
@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
    isLogged = false;
    constructor(private _router: Router, private _auth: AuthService) { }
    profile: any;
    ngOnInit() {
        this._auth.getUser().subscribe((data) => {
            this.profile = data;
        });
        $(document).ready(function(){
            $('.dropdown-button').dropdown();
        });

    };
    logOut = () => {
        this._auth.logOut();
        this._router.navigate(['/Accounts/Login']);
    };

}
