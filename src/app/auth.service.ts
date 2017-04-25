import { Injectable } from '@angular/core';
import { Http, ResponseContentType } from '@angular/http';
import { FacebookService, LoginResponse, LoginOptions, UIResponse, InitParams, UIParams, FBVideoComponent } from 'ng2-facebook-sdk';
import { Router } from '@angular/router';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';

@Injectable()
export class AuthService {
    private isLogged: Boolean = false;
    public profile: any;
    subject: Subject<any> = new Subject<any>();
    constructor(private _http: Http, private Fb: FacebookService, private _router: Router) {
        let initParams: InitParams = {
            appId: '247549532383578',
            xfbml: true,
            version: 'v2.8'
        };
        this.Fb.init(initParams);
    };
    getUser(): Observable<any> {
        this.updateProfile();
        return this.subject.asObservable();
    };
    signIn = () => {
        const loginOptions: LoginOptions = {
            enable_profile_selector: true,
            return_scopes: true,
            scope: 'public_profile,user_friends,email,user_photos'
        };
        this.Fb.login(loginOptions)
            .then((res: LoginResponse) => {
                localStorage.setItem('token', res.authResponse.accessToken);
                this.updateProfile();
                this._router.navigate(['/Accounts/Albums']);
            });
    };
    logOut = () => {
        localStorage.removeItem('token');
        this.profile = null;
        this.subject.next(null);
        this.Fb.getLoginStatus()
            .then((res) => {
                if (res.status === 'connected')
                    this.Fb.logout()
                        .then((res) => {
                            this.profile = null;
                            this.subject.next(null);
                        })
                        .catch((err) => {
                            this.profile = null;
                            this.subject.next(null);
                        });
            })
            .catch((err) => {
                console.log("Logged out!");
            });
    };
    isConnected = () => {
        this.updateProfile();
        return this.Fb.getLoginStatus();
    };
    getBlob = (url) => {
        return this._http.get(url, { responseType: ResponseContentType.Blob });
    };
    updateProfile = () => {
        var token = localStorage.getItem('token');
        this.Fb.api('/me?fields=id,name,first_name,gender,picture.width(40).height(40),age_range,friends&access_token=' + token)
            .then((res) => {
                this.profile = res;
                this.subject.next(this.profile);
            })
            .catch((err) => {
                this.profile = null;
                this.subject.next(this.profile);
            });
    };
    getProfile = () => {
        this.updateProfile();
        var token = localStorage.getItem('token');
        return this.Fb.api('/me?fields=id,name,first_name,gender,picture.width(150).height(150),age_range,friends&access_token=' + token)
            ;
    };
    getAlbums = () => {
        this.updateProfile();
        var token = localStorage.getItem('token');
        return this.Fb.api('/me/albums?fields=id,cover_photo.fields(images),count,name&access_token=' + token);
    };
    loadMore = (albumId, after, pictures) => {
        var token = localStorage.getItem('token');
        return this.Fb.api('/' + albumId + '/photos?fields=id,images&access_token=' + token + '&limit=100&after=' + after)
            .then((res) => {
                pictures = pictures.concat(res.data);
                if (res.paging && res.paging.next && res.paging.next != "") {
                    return this.loadMore(albumId, res.paging.next, pictures);
                }
                else {
                    return pictures;
                }
            })
            .catch(err => console.log(err));
    };
}
