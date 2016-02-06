import {Injectable} from 'angular2/core';
import {Http, Headers, Response} from 'angular2/http';
import 'rxjs/add/operator/map';


@Injectable()
export class AppLovService {

    private _apiURLBase = 'http://localhost:3000';

    getLovs() {
        return this._http.get(this._apiURLBase + '/lovapi')
                .map(res => res.json());
    }

    constructor(private _http: Http) { }

}