import { KEYNAMELOCALSTORAGE } from './../constants/constant';
import { LocalStorageService } from './../helpers/localStorage.service';
import { Injectable, Injector } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth/auth.service';

@Injectable()

export class AuthInterceptor implements HttpInterceptor {
    private authService: AuthService;
    constructor(
        private injector: Injector,
        private localStorageService: LocalStorageService) {
        setTimeout(() => {
            this.authService = this.injector.get(AuthService);
        })
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let tokenId = localStorage.getItem(KEYNAMELOCALSTORAGE.TOKEN_ID);
        if (tokenId) {
            let token = JSON.parse(tokenId);
            const cloned = req.clone({
                headers: req.headers.set('Authorization', 'Bearer ' + token.access_token)
            });
            return next.handle(cloned);
        } else {
            return next.handle(req);
        }
    }
}