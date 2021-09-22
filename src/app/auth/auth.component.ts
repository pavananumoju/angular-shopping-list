import { Component, ComponentFactoryResolver, OnDestroy, ViewChild, ViewContainerRef } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { Observable, Subscription } from "rxjs";
import { AlertComponent } from "../shared/alert/alert.component";
import { PlaceHolderDirective } from "../shared/placeholder/place-holder.directive";
import { AuthResponseData, AuthService } from "./auth.service";

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html'
})
export class AuthComponent implements OnDestroy{
    isLoginMode = true;
    isLoading = false;
    error:string = null;
    @ViewChild(PlaceHolderDirective, {static: false}) alertHost: PlaceHolderDirective;
    private closeSub: Subscription;

    constructor(private authService: AuthService, private router: Router, private compFactRes: ComponentFactoryResolver){}

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
            this.router.navigate(['./recipes'])
        }, errorMessage => {
            this.isLoading = false;
            this.error = errorMessage;
            this.showErrorAlert(errorMessage);
            // console.log(error);
        });

        authForm.reset();
    }

    onHandleClose(){
        this.error = null;
    }

    private showErrorAlert(message: string){
        const comFactResolver = this.compFactRes.resolveComponentFactory(AlertComponent);
        const hostViewContRef = this.alertHost.viewContRef;
        hostViewContRef.clear();
        const compRef = hostViewContRef.createComponent(comFactResolver);
        compRef.instance.message = message;
        this.closeSub = compRef.instance.close.subscribe(() =>{
            this.closeSub.unsubscribe();
            hostViewContRef.clear();
        });
    }

    ngOnDestroy(){
        if(this.closeSub){
            this.closeSub.unsubscribe();
        }
    }
}