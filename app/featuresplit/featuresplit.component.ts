import {Component, OnInit, Inject, forwardRef} from 'angular2/core';
import {Router, ROUTER_DIRECTIVES} from 'angular2/router';

import {AppLov} from '../applov/applov';
import {AppLovService} from '../applovservice/applov.service';

@Component({
    selector: 'featuresplit',
    templateUrl: 'app/featuresplit/featuresplit.component.html',
    providers: [AppLovService]
})
export class FeatureSplitComponent implements OnInit {

    private featureList: AppLov;

    constructor(private _lovService: AppLovService,
                private _router: Router) { }

    ngOnInit() {
        this._lovService.getLovs().subscribe(
            lovData => {
                this.featureList = this._lovService.getIndividualFeatureByName('Category', lovData);
            },
            error => console.log(error),
            () => console.log('lovs retrieved'));
    }

    selectFeature(featureValue: string) {
        this._router.navigate(['PostList', {category: featureValue}]);
    }
}