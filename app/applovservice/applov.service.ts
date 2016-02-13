import {Injectable} from 'angular2/core';
import {Http, Headers, Response} from 'angular2/http';
import 'rxjs/add/operator/map';

import {AppLov} from '../applov/AppLov';

@Injectable()
export class AppLovService {

    private _apiURLBase = 'http://localhost:3000';

    getLovs() {
        return this._http.get(this._apiURLBase + '/lovapi')
                .map(res => res.json());
    }

    // extract a single feature by name
    getIndividualFeatureByName(name :string, lovs: AppLov[]) {
        for (let l of lovs) {
            if (l.lovName === name) {
                return l;
            }
        }
    }

    // get all the features for a dependency
    getIndividualFeaturesByDependency(dep :string, lovs: AppLov[]) {
        let ret = new Array<AppLov>();
        for (let l of lovs) {
            if (l.depValue === dep) {
                ret.push(l);
            }
        }
        return ret;
    }

    constructor(private _http: Http) { }

}