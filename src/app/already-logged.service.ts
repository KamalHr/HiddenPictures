import { Injectable } from '@angular/core';
import { Router, CanActivate } from "@angular/router";
import { AuthService } from "./auth.service";
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';

@Injectable()
export class LoginGuard {

	constructor(private auth: AuthService, private router: Router) { }
	canActivate(): Observable<boolean> | boolean {
		if (localStorage.getItem("token")) {
			this.router.navigate(['/Accounts/Albums']);
			return Observable.of(false);
		} else {
			return Observable.of(true);
		}
	}

}
