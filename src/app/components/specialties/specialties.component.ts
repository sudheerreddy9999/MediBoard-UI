import { Component, OnInit } from '@angular/core';
import { DoctorService } from '../../services/doctor.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../shared/auth.service';
import { TruncateDescriptionPipe } from '../../pipes/truncate-description.pipe';
interface ApiResponse {
  message: string; // Message from the API response
  doctorData: any[]; // Updated to match the response structure
}

@Component({
  selector: 'app-specialties',
  standalone: true,
  imports: [CommonModule,TruncateDescriptionPipe],
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
    {
      categeory:"Neurologist(MD)",
      image:"https://cdn-icons-png.freepik.com/256/9619/9619476.png?semt=ais_hybrid"
    },
    {
      categeory:' Gastroenterologist(MD)',
      image:"https://cdn-icons-png.freepik.com/512/8143/8143044.png"
    },
    {
      categeory:'Cardiologists(MD)',
      image:"https://cdn-icons-png.freepik.com/512/10362/10362465.png"
    },
    {
      categeory:'Dermatologist(MD)',
      image:"https://img.freepik.com/premium-vector/dermatologist-icon-vector-image-can-be-used-skin-burns_120816-356192.jpg?w=740",

    },
    {
      categeory:'Orthopedic Surgeon',
      image:"https://img.freepik.com/premium-vector/vector-design-orthopedic-surgery-icon-style_822882-117689.jpg?w=740"
    },
    {
      categeory:"Gastroenterologist",
      image:"https://img.freepik.com/premium-vector/vector-design-gastroenterology-icon-style_1134108-98427.jpg"

    },
    {
      categeory:"Pediatricians",
      image:"https://cdn.iconscout.com/icon/premium/png-256-thumb/pediatric-care-5376702-4490281.png?f=webp&w=256"

    },
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
    this.AuthService.changeSpecialization('');
    this.AuthService.changeSearchValue(doctName);
  }
  handlespecialization(category: string) {
    this.router.navigate(['Patient/Doctors']);
    this.AuthService.changeSearchValue('');
    this.AuthService.changeSpecialization(category);
  }
}
