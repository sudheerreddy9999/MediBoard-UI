import { Component, EventEmitter, Output, Input } from '@angular/core';
import { DoctorService } from '../../services/doctor.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { LoaderComponent } from '../loader/loader.component';
interface ApiResponse {
  message: string; // Message from the API response
  doctorData: any[]; // Updated to match the response structure
}

@Component({
  selector: 'app-display-doctors',
  standalone: true,
  imports: [MatIcon, MatIconModule, CommonModule, FormsModule, LoaderComponent],
  templateUrl: './display-doctors.component.html',
  styleUrl: './display-doctors.component.css',
})
export class DisplayDoctorsComponent {
  constructor(private doctorService: DoctorService) {
    this.filteredData = this.doctorsData;
  }
  @Output() doctorInfo = new EventEmitter<any>();
  @Output() closeDoctorsSearch = new EventEmitter<boolean>();
  @Input() enableCloseButton: boolean = false;
  @Input() buttonMessage: string = 'doctor';
  doctorsData: any = [];
  filteredData: any[] = [];
  searchContent: string = '';
  loaderOn: boolean = true;

  ngOnInit(): void {
    this.doctorService.fetchDoctors().subscribe(
      (data: ApiResponse) => {
        this.doctorsData = data.doctorData;
        this.filteredData = data.doctorData;
        this.loaderOn = false;
      },
      (error) => {
        console.error('Error fetching doctors:', error);
      }
    );
  }
  onSearch() {
    this.filteredData = this.doctorsData.filter((item: { name: string }) =>
      item.name.toLowerCase().includes(this.searchContent.toLowerCase())
    );
  }
  sendDoctordata(doctorname: string, doctor_id: string) {
    const doctorInfo = {
      name: doctorname,
      id: doctor_id,
    };
    this.doctorInfo.emit(doctorInfo);
  }
  closeModal() {
    this.closeDoctorsSearch.emit(false);
  }
}
