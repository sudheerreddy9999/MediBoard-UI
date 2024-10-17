import { Component,Output,EventEmitter,OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LoaderComponent } from '../../components/loader/loader.component';
import { environment } from '../../../environments/environment';
import { ModalComponent } from '../../components/modal/modal.component';
import { DoctorService } from '../../services/doctor.service';
interface ApiResponse {
  message: string; // Adjust based on your actual API response structure
  doctors: any[]; // Adjust based on your actual doctors data structure
}
@Component({
  selector: 'app-doctors',
  standalone: true,
  imports: [MatIconModule,CommonModule,FormsModule,LoaderComponent,ModalComponent],
  templateUrl: './doctors.component.html',
  styleUrl: './doctors.component.css'
})
export class DoctorsComponent implements OnInit {
  private apiUrl:string =environment.apiBaseUrl;
  doctors: any[] = []; 
  filteredData:any[] =[];
  searchContent:string = ''
  loaderOn:boolean=true;
  openModalComponent:boolean=false
  modalMessage: string = 'faliure';
  typeOfModal: string = 'failure';
  @Output() doctorInfo = new EventEmitter<any>();
  @Output() closeDoctorsSearch = new EventEmitter<boolean>();

  constructor(private http: HttpClient, private doctorsData:DoctorService) {
    this.filteredData = this.doctors
  }
  ngOnInit(): void {
    this.doctorsData.fetchDoctors().subscribe((data)=>{
      this.loaderOn = false
      this.doctors = data.doctorData
      this.filteredData=data.doctorData
    })
  }
  onSearch(){
    this.filteredData = this.doctors.filter(item=>
      item.name.toLowerCase().includes(this.searchContent.toLowerCase())
    )
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
  handleCloseEmitModal(closeModal: boolean) {
    this.openModalComponent = closeModal;
  }
}
