import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Observable } from "rxjs";
import { AuthResponseData, AuthService } from "./auth.service";

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html'
})
export class AuthComponent{
    isLoginMode = true;
    isLoading = false;
    error:string = null;

    constructor(private authService: AuthService){}

    onSwitchMode(){
        this.isLoginMode = !this.isLoginMode;
    }

    onSubmit(authForm: NgForm){
        // console.log(authForm.value);
        if(!authForm.valid){
            return;
        }

        const email = authForm.value.email;
        const password = authForm.value.password;

        let authObs: Observable<AuthResponseData>;

        this.isLoading = true;

        if(this.isLoginMode){
            authObs = this.authService.login(email, password)
        } else{
            authObs = this.authService.signUp(email, password)
        }

        authObs.subscribe(
        (responseData) => {
            this.isLoading = false;
            console.log(responseData);
        }, errorMessage => {
            this.isLoading = false;
            this.error = errorMessage;
            // console.log(error);
        });

        authForm.reset();
    }
}