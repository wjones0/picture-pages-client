import {Injectable} from 'angular2/core';
import {Http, Headers, Response} from 'angular2/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class PicUploadAWSS3Service {

    private _apiURLBase = 'http://localhost:3000';

    private getS3URL(theFile: File) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');

        return this._http.post(this._apiURLBase + '/awsapi/getAWSS3URL',
                `{"type": "${theFile.type}","name": "${theFile.name}"}`,
                { headers: headers })
            .map(res => res.json());
    }

    private performUpload(url, theFile: File) {

        var xhr = new XMLHttpRequest();
        xhr.open('PUT', url);
        xhr.setRequestHeader('x-amz-acl', 'public-read');
        xhr.setRequestHeader('Content-Type', theFile.type);

        xhr.onerror = function() {
            alert('Could not upload file.');
        };

        xhr.send(theFile);

    }

    uploadFile(theFile: File) {
        return Observable.create(observer => {
            console.log(observer);
            this.getS3URL(theFile).subscribe(
                returnedData => {
                    this.performUpload(returnedData.signed_request, theFile);
                    observer.next(returnedData.url);
                    observer.complete();
                },
                error => console.log(error),
                () => console.log('URL getting finished')
            );

        });

    }

    constructor(private _http: Http) { }

}