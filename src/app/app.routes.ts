import { Routes } from '@angular/router';
import { DoctorComponent } from './doctor/doctor.component';
import { EmployeeComponent } from './employee/employee.component';

export const routes: Routes = [
    {path:'Doctor',component:DoctorComponent},
    {path:'Employee',component:EmployeeComponent}
    
];
