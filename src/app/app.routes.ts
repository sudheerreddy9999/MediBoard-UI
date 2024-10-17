import { Routes } from '@angular/router';
import { DoctorComponent } from './doctor/doctor.component';
import { EmployeeComponent } from './employee/employee.component';
import { HomepageComponent } from './homepage/homepage.component';
import { DoctorsComponent } from './appointments/doctors/doctors.component';

export const routes: Routes = [
    {path:'Patient',component:HomepageComponent},
    {path:'Doctor',component:DoctorComponent},
    {path:'Employee',component:EmployeeComponent},
    {path:'Patient/Doctors',component:DoctorsComponent} 
];
