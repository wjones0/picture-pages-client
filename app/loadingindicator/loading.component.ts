import {Component, OnInit} from 'angular2/core';

@Component({
    selector: 'loader',
    templateUrl: '/app/loadingindicator/loading.component.html'
})

export class LoadingComponent implements OnInit {

    public message: string;

    constructor() { }

    ngOnInit() { }
}