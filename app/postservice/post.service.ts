import {Injectable} from 'angular2/core';
import {Http, Headers, Response} from 'angular2/http';
import 'rxjs/add/operator/map';

import {Post} from '../posts/post';
import {POSTS} from './mock-posts';

@Injectable()
export class PostService {

    private _apiURLBase = 'http://localhost:3000';

    // get initial set of posts
    getPosts(feature1: string) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');

        return this._http.post(this._apiURLBase + '/postapi/init', JSON.stringify({ feature1: feature1 }), { headers:headers })
                .map(res => res.json());
    }

    // get more posts from whatever the last id is
    getMorePosts(feature1: string, currentLastID: string) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');

        return this._http.post(this._apiURLBase + '/postapi/more',
                               JSON.stringify( { feature1: feature1, lastID: currentLastID } ),
                               { headers:headers })
            .map(res => res.json());
    }

    newPost(theNewPost: Post) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');

        theNewPost.date = new Date();
        //theNewPost.picurl = encodeURIComponent(theNewPost.picurl);

        return this._http.post(this._apiURLBase + '/postapi', JSON.stringify(theNewPost), { headers:headers })
            .map(res => res.json());
    }

    constructor(private _http: Http) { }

}