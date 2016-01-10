import {Component, OnInit} from 'angular2/core';

import {Post} from './post';
import {PostService} from './post.service';
import {PostCompactComponent} from './postcompact.component';

@Component({
    selector: 'post-list',
    templateUrl: '/app/posts/postlist.component.html',
    directives: [PostCompactComponent],
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

