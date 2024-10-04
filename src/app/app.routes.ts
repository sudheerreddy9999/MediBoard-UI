import { Routes } from '@angular/router';
import { DoctorComponent } from './doctor/doctor.component';
import { EmployeeComponent } from './employee/employee.component';
import { HomepageComponent } from './homepage/homepage.component';

export const routes: Routes = [
    {path:'Patient',component:HomepageComponent},
    {path:'Doctor',component:DoctorComponent},
    {path:'Employee',component:EmployeeComponent}
    
];
