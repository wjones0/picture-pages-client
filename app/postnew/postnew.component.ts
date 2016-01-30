import {Component, OnInit} from 'angular2/core';
import {NgForm} from 'angular2/common';
import {Router, ROUTER_DIRECTIVES} from 'angular2/router';

import {Post} from '../posts/post';
import {PostService} from '../postservice/post.service';
import {PicUploadAWSS3Service} from '../picupload/picupload-awss3.service';


@Component({
    selector: 'post-new',
    templateUrl: '/app/postnew/postnew.component.html',
    directives: [ROUTER_DIRECTIVES],
    providers: [PostService, PicUploadAWSS3Service]
})

export class PostNewComponent implements OnInit {

    constructor(private _postService: PostService,
        private _awsService: PicUploadAWSS3Service,
        private _router: Router) { }

    ngOnInit() { }

    model = new Post();
    pickedFile: File;

    temporaryMissingFile = false;
    submitting = false;

    onSubmit() {
        if (!this.pickedFile || this.pickedFile.type.indexOf('image/') === -1) {
            this.temporaryMissingFile = false;
            return;
        }

        console.log('submtting');

        this.submitting = true;
        this._awsService.uploadFile(this.pickedFile).subscribe(
            newURL => {
                this.model.picurl = newURL;
                this._postService.newPost(this.model).subscribe(
                    res => this._router.navigate(['PostList']),
                    error => console.log(error),
                    () => console.log('post creation finished')
                );
            },
            error => {
                console.log(error);
                this._router.navigate(['PostList']);
            },
            () => console.log('upload complete')

        );

    }

    filePicked($event): void {
        this.pickedFile = $event.target.files[0];
        console.log(this.pickedFile);
        if (this.pickedFile) {
            this.temporaryMissingFile = true;
        } else {
            this.temporaryMissingFile = false;
        }
    }

}