import { ChangeDetectionStrategy, Component, Input, OnInit, Inject } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AuthService } from '../auth.service'
import { AngularFire, FirebaseListObservable, FirebaseApp } from 'angularfire2';
import {NgxPaginationModule} from 'ngx-pagination';
declare var swal: any;
import 'rxjs/add/operator/toPromise';

@Component({
    selector: 'app-photos',
    templateUrl: './photos.component.html',
    styleUrls: ['./photos.component.css'],
    providers: [NgxPaginationModule]
})
export class PhotosComponent implements OnInit {
    albumId: any;
    @Input('data') pictures = [];
    page: number = 1;
    firebase: any;
    that: PhotosComponent = this;
    profile;
    uploadProgress = 0;
    totale = 0;
    numberOf = 0;
    isLoading = false;
    isUploading = false;
    constructor(private _router: Router,
        private activatedRoute: ActivatedRoute,
        private auth: AuthService,
        private _af: AngularFire,
        @Inject(FirebaseApp) firebase: any
    ) {
        this.firebase = firebase;
    }
    ngOnInit() {
        this.activatedRoute.params.subscribe((params: Params) => {
            this.pictures = [];
            this.albumId = params['id'];
            this.isLoading = true;
            this.auth.loadMore(this.albumId, '', this.pictures)
                .then((res) => {
                    var pictures = res;
                    for (var i = pictures.length - 1; i >= 0; i--) {
                        pictures[i].checked = false;
                    }
                    this.pictures = pictures;
                    setTimeout(() => {
                        this.isLoading = false;
                    }, 2000);

                })
                .catch((err) => {
                    console.log(err);
                    localStorage.removeItem('token');
                    this._router.navigate(['/Accounts/Albums']);
                });
        });
        this.auth.getProfile()
            .then((res) => {
                this.profile = res;
                console.log(res);
            })
            .catch((err) => {
                localStorage.removeItem('token');
                this._router.navigate(['/Accounts/Albums']);
            });
    };
    uploadImage(url, newName) {
        return new Promise((resolve, reject) => {
            this.auth.getBlob(url)
                .subscribe((res) => {
                    // console.log(res.json());
                    var picRef = this.firebase.storage().ref().child('images/' + this.profile.id + '/' + newName);
                    var task = picRef.put(res.json());
                    task.then((res) => {
                        resolve(res);
                    }).catch((err) => {
                        reject(err);
                    });
                    var oldProg = 0;
                    task.on('state_changed', (snapshot) => {
                        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                        this.totale -= oldProg;
                        this.totale += progress;
                        oldProg = progress;
                        this.uploadProgress = Math.trunc( this.totale / this.numberOf );
                    });
                });
        });
    };
    upload = () => {
        var pictures = this.pictures.filter(function (item) {
            return (item.checked);
        });
        this.numberOf = pictures.length;
        swal({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            showLoaderOnConfirm: true,
            confirmButtonText: 'Upload!',
            allowOutsideClick: false,
            allowEscapeKey: false,
        }).then(() => {
            this.isUploading = true;
            var promises = [];
            for (var i = pictures.length - 1; i >= 0; i--) {
                promises.push(this.uploadImage(pictures[i].images[0].source, pictures[i].id));
            }
            Promise.all(promises)
                .then(() => {
                    this.pictures = this.pictures.map((item) => {
                        item.checked = false;
                        return item;
                    });
                    this.isUploading = false;
                    this.totale = 0;
                    this.uploadProgress = 0;
                    this.numberOf = 0;
                    swal(
                        'Uploaded!',
                        'Your files has been uploaded.',
                        'success'
                    )
                        .catch(() => {

                        });
                })
                .catch((e) => {
                    swal(
                        'Error!',
                        'Your pictures has not been uploaded.',
                        'error'
                    )
                        .catch(() => {

                        });
                });

        })
            .catch(() => {
                swal(
                    'Error!',
                    'Your pictures has not been uploaded.',
                    'error'
                )
                    .catch(() => {

                    });
            });
    };
}
