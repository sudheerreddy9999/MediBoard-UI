import { Routes } from '@angular/router';
import { DoctorComponent } from './doctor/doctor.component';
import { EmployeeComponent } from './employee/employee.component';
import { HomepageComponent } from './homepage/homepage.component';
// import { DoctorsComponent } from './appointments/doctors/doctors.component';
import { ViewAppointmentsComponent } from './components/view-appointments/view-appointments.component';
import { DoctorsInfoComponent } from './components/doctors-info/doctors-info.component';
import { PreviousRecordsComponent } from './components/previous-records/previous-records.component';
import { EmployeeDoctorComponent } from './employee/doctors/doctors.component';

export const routes: Routes = [
    // {path:'Patient',component:HomepageComponent},
    {path:'Doctor',component:DoctorComponent},
    {path:'Employee',component:EmployeeComponent},
    {path:'Patient/Doctors',component:DoctorsInfoComponent},
    {path:'Patient/Appointments',component:ViewAppointmentsComponent},
    {path:'Patient/Records',component:PreviousRecordsComponent},
    {path:'employee/doctors',component:EmployeeDoctorComponent}

];
