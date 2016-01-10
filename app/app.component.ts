import {Component} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router';

import {PostListComponent} from './posts/postlist.component';

@Component({
    selector: 'my-app',
    templateUrl:'app/app.component.html',
    directives: [ROUTER_DIRECTIVES, PostListComponent]
})
// @RouteConfig([
// 
//   { // PostList child route
//     path: '/postlist',
//     name: 'Postlist',
//     component: PostListComponent,
//     useAsDefault: true
//   }
// 
// //   {path: '/heroes',   name: 'Heroes',     component: HeroListComponent},
// //   {path: '/hero/:id', name: 'HeroDetail', component: HeroDetailComponent},
// //   {path: '/disaster', name: 'Asteroid', redirectTo: ['CrisisCenter', 'CrisisDetail', {id:3}]}
// ])
export class AppComponent { }