import {Component, OnInit, Inject, forwardRef} from 'angular2/core';
import {PostListComponent} from '../postlist/postlist.component';

import {AppLov} from '../applov/applov';
import {AppLovService} from '../applovservice/applov.service';

@Component({
    selector: 'featuresplit',
    templateUrl: 'app/featuresplit/featuresplit.component.html',
    providers: [AppLovService]
})
export class FeatureSplitComponent implements OnInit {

    private selectedFeature: string;
    private featureList: AppLov;

    constructor(@Inject(forwardRef(() => PostListComponent)) private _parent:PostListComponent,
                private _lovService: AppLovService) { }

    ngOnInit() {
        this._lovService.getLovs().subscribe(
            lovData => {
                this.featureList = this._lovService.getIndividualFeatureByName('Category', lovData);
            },
            error => console.log(error),
            () => console.log('lovs retrieved'));
    }

    selectFeature(featureValue: string) {
        this.selectedFeature = featureValue;
        this._parent.selectFeature(this.selectedFeature);
    }
}