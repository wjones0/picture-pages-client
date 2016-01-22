import {Component, OnInit} from 'angular2/core';

import {Post} from '../posts/post';

@Component({
    selector: 'post-compact',
    templateUrl: '/app/posts/postcompact.component.html',
    inputs: ['post']
})

export class PostCompactComponent implements OnInit {

    public post: Post;

    constructor() { }

    ngOnInit() { }

    thing(thedate :string) {
        let monthNames = [
            "January", "February", "March",
            "April", "May", "June", "July",
            "August", "September", "October",
            "November", "December"
        ];

        let date = new Date(thedate);
        let monthIndex = date.getMonth();

        return(date.getDate() + ' ' + monthNames[monthIndex] + ' ' + date.getFullYear() + ' ' + date.getHours() + ":" + ("0" + date.getMinutes()).slice(-2));
    }
}