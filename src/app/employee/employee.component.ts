import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { SlotComponent } from './slot/slot.component';

@Component({
  selector: 'app-employee',
  standalone: true,
  imports: [MatIconModule,CommonModule,SlotComponent],
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.css'
})
export class EmployeeComponent {
   currentComponent ='doctors'
  toggleComponnet(componnet:string) {
    this.currentComponent = componnet;
}
getDoctors(){
  this.currentComponent=''
}


}
