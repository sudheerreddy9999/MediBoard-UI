import { Component, EventEmitter, Output, Input } from '@angular/core';
import { DoctorService } from '../../services/doctor.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { LoaderComponent } from '../loader/loader.component';
import { AuthService } from '../../shared/auth.service';
import { TruncateDescriptionPipe } from '../../pipes/truncate-description.pipe';
interface ApiResponse {
  message: string; // Message from the API response
  doctorData: any[]; // Updated to match the response structure
}

@Component({
  selector: 'app-display-doctors',
  standalone: true,
  imports: [MatIcon, MatIconModule, CommonModule, FormsModule, LoaderComponent,TruncateDescriptionPipe],
  templateUrl: './display-doctors.component.html',
  styleUrl: './display-doctors.component.css',
})
export class DisplayDoctorsComponent {
  constructor(
    private doctorService: DoctorService,
    private AuthService: AuthService
  ) {
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
  selectedCategory: any = null;
  doctorCategories = [
    'Neurologist(MD)',
    ' Gastroenterologist(MD)',
    'Cardiologists(MD)',
    'Dermatologist(MD)',
    'Orthopedic Surgeon',
    'Orthopedic Surgeon(MD)',
    'Gastroenterologist',
    'Pediatricians',
  ];

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
    this.AuthService.searchValue$.subscribe((value) => {
      if(value){
      this.searchContent = value;
      this.onSearch();
      }
    });
    this.AuthService.specializationValue$.subscribe((value) => {
       value?this.categorySelected(value):''
    });
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
  categorySelected(category: any) {
    this.searchContent = '';
    this.filteredData = this.doctorsData.filter((item: any) => {
      return item.specialization == category;
    });
    if (this.selectedCategory == category) {
      this.selectedCategory = null;
      this.filteredData = this.doctorsData;
    } else {
      this.selectedCategory = category;
    }
  }
  closeModal() {
    this.closeDoctorsSearch.emit(false);
  }
}
