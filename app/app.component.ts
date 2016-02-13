import {Component} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router';

import {PostListComponent} from './postlist/postlist.component';
import {PostNewComponent} from './postnew/postnew.component';
import {FeatureSplitComponent} from './featuresplit/featuresplit.component';

@Component({
    selector: 'my-app',
    templateUrl:'app/app.component.html',
    directives: [ROUTER_DIRECTIVES, PostListComponent, PostNewComponent]
})
@RouteConfig([
    {
        path: '/',
        name: 'FeatureSplit',
        component: FeatureSplitComponent
    },
    {
        path: '/posts/:category',
        name: 'PostList',
        component: PostListComponent
    },
    { // PostList child route
        path: '/post-new/:category',
        name: 'PostNew',
        component: PostNewComponent
    }
// 
// //   {path: '/heroes',   name: 'Heroes',     component: HeroListComponent},
// //   {path: '/hero/:id', name: 'HeroDetail', component: HeroDetailComponent},
// //   {path: '/disaster', name: 'Asteroid', redirectTo: ['CrisisCenter', 'CrisisDetail', {id:3}]}
])
export class AppComponent { }