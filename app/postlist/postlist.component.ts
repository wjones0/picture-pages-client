import {Component, OnInit} from 'angular2/core';
import {ROUTER_DIRECTIVES} from 'angular2/router';

import {Post} from '../posts/post';
import {PostService} from '../postservice/post.service';
import {PostCompactComponent} from '../postcompact/postcompact.component';

@Component({
    selector: 'post-list',
    templateUrl: '/app/posts/postlist.component.html',
    directives: [ROUTER_DIRECTIVES,PostCompactComponent],
    providers: [PostService]
})

export class PostListComponent implements OnInit {

    public posts: Post[];

    constructor(private _postService: PostService) { }

    ngOnInit() {
        this.getPosts();
    }
    
    getPosts() {
        this._postService.getPosts().subscribe(
            postData => this.posts = postData,
            error => console.log(error),
            () => console.log("posts retrieved"));
    }
    
    
}

