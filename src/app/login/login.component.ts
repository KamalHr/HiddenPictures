import { Component, OnInit } from '@angular/core';
import {AuthService} from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
	user = {
		username: "",
		password: "",
		firstname: "",
		lastname: ""
	};
  	constructor(private _auth: AuthService) { }

  	ngOnInit() {

  	}
  	signIn = () => {
  		this._auth.signIn();
  	};
}
