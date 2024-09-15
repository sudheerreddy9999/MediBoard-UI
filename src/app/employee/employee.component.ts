import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-employee',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.css'
})
export class EmployeeComponent {
  apiUrl = 'http://localhost:3000';
  constructor(private http:HttpClient){}
  getDoctors(){
    this.http.get(`${this.apiUrl}/doctors/get`).subscribe(
      (response)=>{
        console.log(response)
      },(error)=>{
        console.error(`Failed to get Doctors`,error)
      }
    )
  }
}
