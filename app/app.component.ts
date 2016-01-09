import {Component} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router';

import {PostListComponent} from './posts/postlist.component';

@Component({
    selector: 'my-app',
    template: `
    <h1>My First Angular 2 App</h1>
    <router-outlet></router-outlet>`,
    directives: [ROUTER_DIRECTIVES]
})
@RouteConfig([

  { // PostList child route
    path: '/postlist',
    name: 'Postlist',
    component: PostListComponent,
    useAsDefault: true
  }

//   {path: '/heroes',   name: 'Heroes',     component: HeroListComponent},
//   {path: '/hero/:id', name: 'HeroDetail', component: HeroDetailComponent},
//   {path: '/disaster', name: 'Asteroid', redirectTo: ['CrisisCenter', 'CrisisDetail', {id:3}]}
])
export class AppComponent { }