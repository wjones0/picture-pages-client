import {Component, OnInit} from 'angular2/core';
import {NgForm} from 'angular2/common';
import {Router, ROUTER_DIRECTIVES} from 'angular2/router';

import {LoadingComponent} from '../loadingindicator/loading.component';

import {Post} from '../posts/post';
import {PostService} from '../postservice/post.service';

import {PicUploadAWSS3Service} from '../picupload/picupload-awss3.service';

import {AppLov} from '../applov/applov';
import {AppLovService} from '../applovservice/applov.service';


@Component({
    selector: 'post-new',
    templateUrl: '/app/postnew/postnew.component.html',
    directives: [ROUTER_DIRECTIVES, LoadingComponent],
    providers: [PostService, PicUploadAWSS3Service, AppLovService]
})

export class PostNewComponent implements OnInit {

    constructor(private _postService: PostService,
        private _awsService: PicUploadAWSS3Service,
        private _lovService: AppLovService,
        private _router: Router) { }

    loader: LoadingComponent;

    model = new Post();
    pickedFile: File;

    lovs: AppLov[];
    regionLov: AppLov;
    stateLov: AppLov;
    featureLovs: AppLov[];

    temporaryMissingFile = false;
    loadingLovs = false;
    submitting = false;

    ngOnInit() {
        this.getLovs();
        this.loader = new LoadingComponent();
     }

    // upload the file and then submit to api
    onSubmit() {
        if (!this.pickedFile || this.pickedFile.type.indexOf('image/') === -1) {
            this.temporaryMissingFile = false;
            return;
        }

        console.log('submtting');

        //upload 
        this.submitting = true;
        this._awsService.uploadFile(this.pickedFile).subscribe(
            newURL => {
                this.model.picurl = newURL;
                // submit to api after new url receieved
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

    // a file has been picked - get it ready
    filePicked($event): void {
        this.pickedFile = $event.target.files[0];
        console.log(this.pickedFile);
        if (this.pickedFile) {
            this.temporaryMissingFile = true;
        } else {
            this.temporaryMissingFile = false;
        }
    }

    // a feature has been picked - record it and then get the rest of the features
    feature1Picked($event): void {
        this.featureLovs.splice(1, this.featureLovs.length - 1);
        this.model.feature1 = $event.target.value;
        this.featureLovs.push(...this.getIndividualFeaturesByDependency($event.target.value));
    }

    // query the service for all our lovs
    private getLovs() {
        this.loadingLovs = true;
        this._lovService.getLovs().subscribe(
            lovData => {
                this.lovs = lovData;
                this.extractFeatures();
                this.loadingLovs = false;
            },
            error => console.log(error),
            () => console.log('lovs retrieved'));
    }

    // extract specific features from the lovs
    private extractFeatures() {
        this.regionLov = this.getIndividualFeatureByName('Region');
        this.stateLov = this.getIndividualFeatureByName('State/Province');
        this.featureLovs = new Array<AppLov>();
        this.featureLovs.push(this.getIndividualFeatureByName('Category'));
    }

    // extract a single feature by name
    private getIndividualFeatureByName(name :string) {
        for (let l of this.lovs) {
            if (l.lovName === name) {
                return l;
            }
        }
    }

    // get all the features for a dependency
    private getIndividualFeaturesByDependency(dep :string) {
        let ret = new Array<AppLov>();
        for (let l of this.lovs) {
            if (l.depValue === dep) {
                ret.push(l);
            }
        }
        return ret;
    }

}