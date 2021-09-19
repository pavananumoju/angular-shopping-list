import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";
import { AuthService } from "./auth.service";

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

        if(this.isLoginMode){
            // ...
        } else{
            const email = authForm.value.email;
            const password = authForm.value.password;
            this.isLoading = true;
            this.authService.signUp(email, password)
            .subscribe((responseData) => {
                this.isLoading = false;
                console.log(responseData);
            }, errorMessage => {
                this.isLoading = false;
                this.error = errorMessage;
                // console.log(error);
            });
        }

        authForm.reset();
    }
}