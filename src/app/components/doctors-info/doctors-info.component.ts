import { Component } from '@angular/core';
import { DisplayDoctorsComponent } from '../display-doctors/display-doctors.component';
import { Router,RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatIcon,MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-doctors-info',
  standalone: true,
  imports: [DisplayDoctorsComponent,MatIcon,MatIconModule,CommonModule,RouterModule],
  templateUrl: './doctors-info.component.html',
  styleUrl: './doctors-info.component.css'
})
export class DoctorsInfoComponent {
  constructor(private router:Router){}
  enablecloseButton:boolean = false;
  handelReturn(){
    console.log("i got clicked")
    this.router.navigate(['Patient'])
  }
  handleAppointmentData(event:any){
    console.log(event,"I am from parent COmpoent")
  }
}
