import {Component, OnInit} from 'angular2/core';
import {NgForm} from 'angular2/common';
import {Router,ROUTER_DIRECTIVES} from 'angular2/router';

import {Post} from './post';
import {PostService} from './post.service';

@Component({
    selector: 'post-new',
    templateUrl: '/app/posts/postnew.component.html',
    directives: [ROUTER_DIRECTIVES],
    providers: [PostService]
})

export class PostNewComponent implements OnInit {

    constructor(private _postService: PostService,
                private _router: Router) { }

    ngOnInit() { }
    
    model = new Post();
    
    submitted = false;
    
    onSubmit() {
        console.log('submtting');
        this._postService.newPost(this.model).subscribe(
            res => this._router.navigate(['PostList']),
            error => console.log(error),
            () => console.log("post creation finished")
        );
        this.submitted = true; 
        
    }
}