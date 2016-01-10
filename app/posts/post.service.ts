import {Injectable} from 'angular2/core';
import {Http} from 'angular2/http';
import 'rxjs/add/operator/map';

import {Post} from './post';
import {POSTS} from './mock-posts';

@Injectable()
export class PostService {

    private apiURLBase = 'http://localhost:3000';

    getPosts() {
        return this._http.get(this.apiURLBase + '/postapi')
                .map(res => res.json());
    }
    
    constructor(private _http: Http) { }

}