import { Component, OnInit } from '@angular/core';
import { DoctorService } from '../../services/doctor.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../shared/auth.service';
interface ApiResponse {
  message: string; // Message from the API response
  doctorData: any[]; // Updated to match the response structure
}

@Component({
  selector: 'app-specialties',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './specialties.component.html',
  styleUrl: './specialties.component.css',
})
export class SpecialtiesComponent implements OnInit {
  constructor(
    private doctorService: DoctorService,
    private router: Router,
    private AuthService: AuthService
  ) {}
  allDoctors: any = [];
  topFiveDocs: any = [];
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
        this.allDoctors = data.doctorData;
        this.topFiveDocs = data.doctorData.slice(0, 5);
      },
      (error) => {
        console.error('Error fetching doctors:', error);
      }
    );
  }
  handleDoctorClick(doctName: string) {
    this.router.navigate(['Patient/Doctors']);
    this.AuthService.changeSearchValue(doctName);
  }
  handlespecialization(category: string) {
    this.router.navigate(['Patient/Doctors']);
    this.AuthService.changeSpecialization(category);
  }
  truncateDescription(description: string, maxLength: number = 110): string {
    if (!description) return '';
    return description.length > maxLength
      ? description.substring(0, maxLength) + '...'
      : description;
  }
}
