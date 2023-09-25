import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpResponse,
    HttpHandler,
    HttpEvent,
    HttpInterceptor
} from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, mergeMap, materialize, dematerialize } from 'rxjs/operators';
import { IUser } from '../../models/user.model';

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {

    constructor() { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        const users: IUser[] = JSON.parse(localStorage.getItem('users')!) || [{ name: 'admin', gender: 'MALE', id: '1' }];

        // wrap in delayed observable to simulate server api call
        return of(null).pipe(mergeMap(() => {

            // access to library with any user
            if (request.url.endsWith('/auth/register') && request.method === 'POST') {

                // get new user object from post body
                const newUser = request.body;
                
                // save new user
                newUser.id = users.length + 1;
                users.push(newUser);
                localStorage.setItem('users', JSON.stringify(users));

                // respond 200 OK & return the user 
                const body = {
                    id: newUser.id,
                    name: newUser.name,
                    gender: newUser.gender,
                    token: 'fake-jwt-token'
                };
                return of(new HttpResponse({ status: 200, body }));
            }

            return next.handle(request);

        }))
            .pipe(materialize())
            .pipe(delay(500))
            .pipe(dematerialize());
    }


}
