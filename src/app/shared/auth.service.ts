import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private employeeLoginStatus =new BehaviorSubject<boolean>(false);
    private selectedEmployeeDropDown = new BehaviorSubject<boolean>(false);
    private searchValue = new BehaviorSubject<string>('');
    private specializationValue  = new BehaviorSubject<string>('')
    employeeLoginStatus$ = this.employeeLoginStatus.asObservable();
    selectedEmployeeDropDown$ = this.selectedEmployeeDropDown.asObservable();
    searchValue$ = this.searchValue.asObservable();
    specializationValue$=this.specializationValue.asObservable();
  isLoggedIn$: any;
    constructor(){}
    login(success: boolean) {
        this.employeeLoginStatus.next(success);
      }
    userTypeEmployee(value:boolean){
        this.selectedEmployeeDropDown.next(value)
    }
    changeSearchValue(value: string) {
      console.log(value,"Inside Auth Service")
      this.searchValue.next(value);
    }
    changeSpecialization(value:string){
      console.log(value,"specalixation value");
      this.specializationValue.next(value);
    }

}