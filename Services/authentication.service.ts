import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { User } from '../models/user';

@Injectable()
export class AuthenticationService {

    user: User;
    isLoggedIn = false;
    baseUrl = 'http://localhost:8080/';
    response: Response;

    constructor(private http: Http) { }

    private static handleError(error: any) {
        const errorMessage = `Server error`;
        console.log(errorMessage);
        return Observable.throw(errorMessage);
    }

    /*login(user) : Observable<boolean> {
		console.log('user.userName:=' + user.userName);
        //return this.http.post(this.baseUrl + 'login', JSON.stringify({ username: username, password: password }))
		return this.http.post(this.baseUrl + 'login', user)
            .map((response: Response) => {
                // login successful if there's a jwt token in the response
				console.log('got response from server' + response.json());
                let user = response.json();
				console.log('user' + user);
				console.log('user.token' + user.token);
                if (user && user.token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
					console.log('before setting localstorage');
                    localStorage.setItem('currentUser', JSON.stringify(user));
					console.log('after setting localstorage');
                }

                return user;
            });
    }*/

    login(user: User): Observable<boolean> {
        return this.http.post(this.baseUrl + 'login', user)
            .map(response => response.json())
            .map((currentUser: User) => {
                console.log('user.userName:=' + user.userName);
                console.log('currentUser.firstName:=' + currentUser.firstName);
                if (!User.isNull(currentUser)) {
                    this.isLoggedIn = true;
                    console.log('JSON.stringify(user):=' + JSON.stringify(currentUser));
                    localStorage.setItem('currentUser', JSON.stringify(currentUser));
                    return true;
                    // return currentUser;					// return currentUser;
                } else {
                    this.isLoggedIn = false;
                    return false;
                }
                // return currentUser;
            });
    }
    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
    }

}
