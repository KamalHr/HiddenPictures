import { Injectable } from '@angular/core';
import { Router,CanActivate } from "@angular/router";
import { AuthService } from "./auth.service";
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';

@Injectable()
export class AuthGuard implements CanActivate {

	constructor(private router: Router) { }
	canActivate(): Observable<boolean> | boolean {
		if(localStorage.getItem("token")){
			return Observable.of(true);
		} else {
			this.router.navigate(['/Accounts/Login']);
			return Observable.of(false);
		}
	}
}
