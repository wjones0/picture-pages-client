import {Component, OnInit} from 'angular2/core';
import {NgForm} from 'angular2/common';
import {Router, ROUTER_DIRECTIVES} from 'angular2/router';

import {Post} from './post';
import {PostService} from './post.service';
import {PicUploadAWSS3Service} from '../picupload/picupload-awss3.service';


@Component({
    selector: 'post-new',
    templateUrl: '/app/posts/postnew.component.html',
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
    submitted = false;

    onSubmit() {
        if(!this.pickedFile)
        {
            this.temporaryMissingFile = false;
            return;
        }
            
        console.log('submtting');

        this._awsService.uploadFile(this.pickedFile).subscribe(
            newURL => {
                this.model.picurl = newURL;
                this._postService.newPost(this.model).subscribe(
                    res => this._router.navigate(['PostList']),
                    error => console.log(error),
                    () => console.log("post creation finished")
                );
            },
            error => console.log(error),
            () => console.log("upload complete")

        );

        this.submitted = true;

    }

    filePicked($event): void {
        this.pickedFile = $event.target.files[0];
        console.log(this.pickedFile);
        if(this.pickedFile) {
            this.temporaryMissingFile = true;
        }
        else {
            this.temporaryMissingFile = false;
        }
    }

}