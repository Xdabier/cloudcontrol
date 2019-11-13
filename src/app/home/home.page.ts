import {Component} from '@angular/core';
import {NavigationExtras, Router} from '@angular/router';
import {ToastController} from '@ionic/angular';

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})
export class HomePage {
    rememberMe = false;
    rememberPage = false;
    email = 'test@test.fr';
    password = 't';
    server = 'https://clc-sit.cloudcontrol.fr';


    // tslint:disable-next-line:variable-name
    constructor(private _router: Router, public toastController: ToastController) {
    }

    async submit(): Promise<any> {
        const ops: NavigationExtras = {
            queryParams: {
                server: this.server,
                login: this.email,
                pass: this.password,
                rememberMe: this.rememberMe,
                rememberPage: this.rememberPage
            }
        };

        try {
            if (await this.verifyInput()) {
                await this._router.navigate(['server'], ops);
            }
        } catch (e) {
            console.log('navigation err = ', e);
        }
    }

    async presentToast(text: string) {
        const toast = await this.toastController.create({
            message: text,
            duration: 2000
        });
        await toast.present();
    }

    async verifyInput(): Promise<any> {
        if (!this.email || !this.validateEmail(this.email)) {
            await this.presentToast('E-mail non valid');
            return false;
        } else if (!this.password) {
            await this.presentToast('Mot de passe non valid');
            return false;
        } else if (!this.server || !this.validURL(this.server)) {
            await this.presentToast('URL de serveur non valid');
            return false;
        } else {
            return true;
        }
    }

    validateEmail(email: string): boolean {
        // tslint:disable-next-line:max-line-length
        const regEx = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return regEx.test(email);
    }

    validURL(url: string): boolean {
        const ccPrefix = `.cloudcontrol.fr`;
        const protocolPrefix1 = `https://`;

        return url.endsWith(ccPrefix) && url.startsWith(protocolPrefix1);
    }

}
