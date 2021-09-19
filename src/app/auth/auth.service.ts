import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, throwError } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import { UserModel } from "./user.model";

export interface AuthResponseData{
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
    registered?: boolean;
}

@Injectable({providedIn: 'root'})
export class AuthService{
    userSubject = new BehaviorSubject<UserModel>(null);

    constructor(private http: HttpClient){}

    signUp(email: string, password: string){
        return this.http
            .post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAie9rdmPOQvBBldJ3nILnxy7qpwZlKtUk',
            {
                email: email,
                password: password,
                returnSecureToken: true
            })
            .pipe(catchError(this.handleError), tap(resData => {
                this.handleAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn);
            }));
    }

    login(email: string, password: string){
        return this.http.post<AuthResponseData>(
            'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAie9rdmPOQvBBldJ3nILnxy7qpwZlKtUk',
            {
                email: email,
                password: password,
                returnSecureToken: true
            }
        ).pipe(catchError(this.handleError), tap(resData => {
            this.handleAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn);
        }));
    }

    private handleAuthentication(email: string, localId:string, token: string, expiresIn: number){
        const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
        const user = new UserModel(email, localId, token, expirationDate);
        this.userSubject.next(user);
    }

    private handleError(errorResponse: HttpErrorResponse){
        let errorMessage = 'An unknown error occurred!';
                if(!errorResponse.error || !errorResponse.error.error){
                    return throwError(errorMessage);
                }
                switch(errorResponse.error.error.message){
                    case 'EMAIL_EXISTS':
                        errorMessage = 'Email Id already exists!';
                        break;
                    case 'EMAIL_NOT_FOUND':
                        errorMessage = 'Email Id not found!';
                        break;
                    case 'INVALID_PASSWORD':
                        errorMessage = 'Incorrect password!';
                        break;
                }
                return throwError(errorMessage);
    }

}