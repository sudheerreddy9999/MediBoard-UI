import { Routes } from '@angular/router';
import { DoctorComponent } from './doctor/doctor.component';
import { EmployeeComponent } from './employee/employee.component';

export const routes: Routes = [
    {path:'doctor',component:DoctorComponent},
    {path:'employee',component:EmployeeComponent}
    
];
