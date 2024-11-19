import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Router } from "@angular/router";

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private employeeLoginStatus =new BehaviorSubject<boolean>(false);
    private selectedEmployeeDropDown = new BehaviorSubject<boolean>(false);
    private searchValue = new BehaviorSubject<string>('');
    private specializationValue  = new BehaviorSubject<string>('')
    private logout = new BehaviorSubject<boolean>(false);
    employeeLoginStatus$ = this.employeeLoginStatus.asObservable();
    selectedEmployeeDropDown$ = this.selectedEmployeeDropDown.asObservable();
    searchValue$ = this.searchValue.asObservable();
    specializationValue$=this.specializationValue.asObservable();
    logout$= this.logout.asObservable();
  isLoggedIn$: any;
    constructor(private router:Router){}
    login(success: boolean) {
        this.employeeLoginStatus.next(success);
      }
    userTypeEmployee(value:boolean){
        this.selectedEmployeeDropDown.next(value)
    }
    changeSearchValue(value: string) {
      this.searchValue.next(value);
    }
    changeSpecialization(value:string){
      this.specializationValue.next(value);
    }
    logoutAuth(value:boolean){
      this.logout.next(value)
      if(value ==true){
        // this.router.navigate['/']
      }
    }

}