import {Component, OnInit} from 'angular2/core';
import {ROUTER_DIRECTIVES} from 'angular2/router';

import {LoadingComponent} from '../loadingindicator/loading.component';

import {FeatureSplitComponent} from '../featuresplit/featuresplit.component';

import {Post} from '../posts/post';
import {PostService} from '../postservice/post.service';
import {PostCompactComponent} from '../postcompact/postcompact.component';

@Component({
    selector: 'post-list',
    templateUrl: 'app/postlist/postlist.component.html',
    directives: [ROUTER_DIRECTIVES, PostCompactComponent, LoadingComponent, FeatureSplitComponent],
    providers: [PostService]
})

export class PostListComponent implements OnInit {

    public posts: Post[];
    selectedFeature: string;

    constructor(private _postService: PostService) { }

    ngOnInit() { }

    selectFeature(feature: string) {
        this.selectedFeature = feature;
        this.getPosts();
    }

    getPosts() {
        this._postService.getPosts(this.selectedFeature).subscribe(
            postData => this.posts = postData,
            error => console.log(error),
            () => console.log('posts retrieved'));
    }

    lastScrollTop = 0;
    addingPosts = false;

    onScroll($event): void {
        let scrolltop = window.pageYOffset;

        if (scrolltop > this.lastScrollTop) {
            // we've hit bottom here - but only do it if we aren't already adding posts
            if ((scrolltop + window.innerHeight >= document.body.clientHeight) && !this.addingPosts) {
                this.addingPosts = true;
                this._postService.getMorePosts(this.selectedFeature, this.posts[this.posts.length - 1]._id).subscribe(
                    postData => {
                        this.posts.push(...postData);
                        this.addingPosts = false;
                    },
                    error => console.log(error),
                    () => console.log('more posts retrieved'));
            }
        }
        this.lastScrollTop = scrolltop;
    }

}

