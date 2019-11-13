import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

const urlParamsPrefixLogin = `/web/login?login=`;
const urlParamsPrefix = `/web/`;

@Component({
    selector: 'app-home',
    templateUrl: 'server.page.html',
    styleUrls: ['server.page.scss'],
})
export class ServerPage implements AfterViewInit {

    url = '';
    // iframe;
    @ViewChild('iframe', null) iframe: ElementRef;

    // tslint:disable-next-line:variable-name
    constructor(private _route: ActivatedRoute) {
        _route.queryParams.subscribe(params => {
            console.log(params);
            this.url = `${params.server}${params.login ? urlParamsPrefixLogin : urlParamsPrefix}${params.login ? params.login  : ''}`;
        });
    }

    ngAfterViewInit() {
        this.iframe.nativeElement.setAttribute('src', this.url);
    }

    onFrameLoaded() {
        this.injectPassword();
    }

    injectPassword() {

        console.log(document.getElementById('_iframe'));
    }
}
