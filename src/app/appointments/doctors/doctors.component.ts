import { Component,Output,EventEmitter,OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LoaderComponent } from '../../components/loader/loader.component';
import { environment } from '../../../environments/environment';
import { ModalComponent } from '../../components/modal/modal.component';
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
  openModalComponnet:boolean=false
  modalMessage: string = 'faliure';
  typeOfModal: string = 'failure';
  @Output() doctorInfo = new EventEmitter<any>();
  @Output() closeDoctorsSearch = new EventEmitter<boolean>();

  constructor(private http: HttpClient) {
    this.filteredData = this.doctors
  }
  ngOnInit(): void {
    this.http.get<any>(`${this.apiUrl}/doctors/all`).subscribe({
      next: (response) => {
        this.loaderOn = false
        this.doctors = response.doctorData
        this.filteredData=response.doctorData
    },error:(error)=>{
      console.error('There was an error!', error);
      this.loaderOn = false
      this.modalMessage = `${error}`
      this.openModalComponnet=true
    },   complete: () => {
      console.log('API request completed successfully.'); // Optional: Handle completion if needed
    },}
  )
  }
  onSerach(){
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
    this.openModalComponnet = closeModal;
  }
}
