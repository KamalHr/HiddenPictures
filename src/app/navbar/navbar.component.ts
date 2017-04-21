import { Component, OnInit } from '@angular/core';
import {AuthService} from '../auth.service';
import {Router} from '@angular/router'
declare var $:any;
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
	isLogged = false;
    constructor(private _router: Router, private _auth: AuthService) { }
    profile:any;
    ngOnInit() {
  		this._auth.getUser().subscribe((data) => {
            this.profile = data;
            //console.log(data);
        });
        $('.dropdown-button').dropdown({
	      	inDuration: 300,
	      	outDuration: 225,
	      	constrainWidth: false, // Does not change width of dropdown to that of the activator
	      	hover: false, // Activate on hover
	      	gutter: 0, // Spacing from edge
	      	belowOrigin: true, // Displays dropdown below the button
	      	alignment: 'right', // Displays dropdown with edge aligned to the left of button
	      	stopPropagation: false // Stops event propagation
	    });
    };
    logOut = () => {
    	this._auth.logOut();
    	this._router.navigate(['/Accounts/Login']);
    };

}
