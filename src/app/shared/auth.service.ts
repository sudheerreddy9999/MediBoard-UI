import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private employeeLoginStatus =new BehaviorSubject<boolean>(false);
    private selectedEmployeeDropDown = new BehaviorSubject<boolean>(false);
    employeeLoginStatus$ = this.employeeLoginStatus.asObservable();
    selectedEmployeeDropDown$ = this.selectedEmployeeDropDown.asObservable();
  isLoggedIn$: any;
    constructor(){}
    login(success: boolean) {
        this.employeeLoginStatus.next(success);
      }
    userTypeEmployee(value:boolean){
        this.selectedEmployeeDropDown.next(value)
    }
}