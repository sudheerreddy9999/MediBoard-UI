import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddEditComponent } from '../appointments/book-appointments/add-edit.component';
import { UsersInfoComponent } from '../components/users-info/users-info.component';
import { FooterComponent } from '../footer/footer.component';
import { SpecialtiesComponent } from '../components/specialties/specialties.component';
// Install the Swiper modules

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [CommonModule,FooterComponent, AddEditComponent,UsersInfoComponent,SpecialtiesComponent],
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class HomepageComponent {

  openBookAppointment: boolean = false;

  slides = [
    { image: '/images/carousel/carousel-1.jpg', title: 'Neurology', description: 'Advanced brain and nerve care.', duration: 3 },
    { image: '/images/carousel/carousel-4.jpg', title: 'Cardiology', description: 'Expert care for heart health.', duration: 4 },
    { image: '/images/carousel/carousel-3.jpg', title: 'Pediatrics', description: 'Comprehensive care for children.', duration: 5 },
    { image: '/images/carousel/carousel-2.jpg', title: 'Neurology', description: 'Advanced brain and nerve care.', duration: 3 },
    { image: '/images/carousel/carousel-5.jpg', title: 'Pediatrics', description: 'Comprehensive care for children.', duration: 5 }
  ];

  bookAppointmentClicked() {
    this.openBookAppointment = !this.openBookAppointment;
  }

  handleCloseAppointment() {
    this.openBookAppointment = false;
  }
}
