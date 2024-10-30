import { Component } from '@angular/core';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
@Component({
  selector: 'app-view-appointments',
  standalone: true,
  imports: [MatIcon,MatIconModule],
  templateUrl: './view-appointments.component.html',
  styleUrl: './view-appointments.component.css'
})
export class ViewAppointmentsComponent {
  constructor(private router:Router){}
  handelReturn(){
    console.log("i got clicked")
    this.router.navigate(['Patient'])
  }
}
