import { Component,Output,EventEmitter,OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { environment } from '../../../environments/environment';
@Component({
  selector: 'app-doctors',
  standalone: true,
  imports: [MatIconModule,CommonModule,FormsModule],
  templateUrl: './doctors.component.html',
  styleUrl: './doctors.component.css'
})
export class DoctorsComponent implements OnInit {
  private apiUrl:string =environment.apiBaseUrl;
  doctors: any[] = []; 
  filteredData:any[] =[];
  searchContent:string = ''
  @Output() doctorInfo = new EventEmitter<any>();
  @Output() closeDoctorsSearch = new EventEmitter<boolean>();

  constructor(private http: HttpClient) {
    this.filteredData = this.doctors
    console.log(this,this.filteredData)
  }
  ngOnInit(): void {
    this.http.get<any>(`${this.apiUrl}/doctors/all`).subscribe({
      next: (response) => {
        this.doctors = response.doctorData
        this.filteredData=response.doctorData
        console.log(this.doctors)
        console.log(response)
    },error:(error)=>{
      console.error('There was an error!', error);
    },   complete: () => {
      console.log('API request completed successfully.'); // Optional: Handle completion if needed
    },}
  )
  }
  onSerach(){
    console.log("hello How are you")
    this.filteredData = this.doctors.filter(item=>
      item.name.toLowerCase().includes(this.searchContent.toLowerCase())
    )
    console.log(this.filteredData)
  }
  closeModal(){
    this.closeDoctorsSearch.emit(false);
  }
  sendDoctordata(doctorname:string,doctor_id:string){
    const doctorInfo ={
      name:doctorname,
      id:doctor_id
    }
    this.doctorInfo.emit(doctorInfo)
  }
}
