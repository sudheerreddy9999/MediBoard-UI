import { Component,OnInit } from '@angular/core';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { CommonModule } from '@angular/common';
import { error } from 'console';
@Component({
  selector: 'app-view-appointments',
  standalone: true,
  imports: [MatIcon,MatIconModule,CommonModule],
  templateUrl: './view-appointments.component.html',
  styleUrl: './view-appointments.component.css'
})
export class ViewAppointmentsComponent implements OnInit {
  apiUrl =environment.apiBaseUrl
  userAppointments:any =[]
  constructor(private router:Router,private http:HttpClient){}
  handelReturn(){
    console.log("i got clicked")
    this.router.navigate(['Patient'])
  }
  ngOnInit(): void {
    this.http.get(`${this.apiUrl}/appointments/user`).subscribe({
      next:(res:any)=>{
        console.log(res)
        this.userAppointments = res.data
        console.log(this.userAppointments)
      },error:(error)=>{
        console.error(error);
      },complete:()=>{
        console.log("Api Call completed SuccessFully")
      }
    })
  }
}
