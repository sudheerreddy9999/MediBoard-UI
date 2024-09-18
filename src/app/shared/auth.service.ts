import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private employeeLoginStatus =new BehaviorSubject<boolean>(false);
    employeeLoginStatus$ = this.employeeLoginStatus.asObservable();
    constructor(){}
    login(success: boolean) {
        console.log("I am Inside it and hello how are you",success)
        this.employeeLoginStatus.next(success);
      }
}