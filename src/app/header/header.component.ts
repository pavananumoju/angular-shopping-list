import { Component, OnDestroy, OnInit} from "@angular/core";
import { Subscription } from "rxjs";
import { AuthService } from "../auth/auth.service";
import { UserModel } from "../auth/user.model";
import { DataStorageService } from "../shared/data-storage.service";

@Component({
    selector:'app-header',
    templateUrl:'./header.component.html',
})
export class HeaderComponent implements OnInit, OnDestroy{

    isAuthenticated = false;
    private userSub : Subscription;

    constructor(private dataStorageService: DataStorageService, private authService: AuthService){}
   
    onSaveData(){
        this.dataStorageService.storeRecipes();
    }

    ngOnInit(){
       this.userSub = this.authService.userSubject.subscribe((user:UserModel) =>{
        // this.isAuthenticated = !user ? false : true;
        this.isAuthenticated = !!user;
        console.log(!user);
        console.log(!!user);
       });
    }

    onFetchData(){
        this.dataStorageService.fetchRecipes().subscribe();
    }

    onLogout(){
        this.authService.logout();
    }

    ngOnDestroy(){
        this.userSub.unsubscribe();
    }
}