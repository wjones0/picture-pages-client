import {Component, OnInit} from 'angular2/core';

import {Post} from './post';

@Component({
    selector: 'post-compact',
    templateUrl: '/app/posts/postcompact.component.html',
    inputs: ['post']
})

export class PostCompactComponent implements OnInit {

    public post: Post;

    constructor() { }

    ngOnInit() { }
}