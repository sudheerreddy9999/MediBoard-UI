import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SwiperOptions } from 'swiper/types';
import { AddEditComponent } from '../appointments/add-edit/add-edit.component';

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [CommonModule,AddEditComponent],
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class HomepageComponent {
  openBookAppointment:boolean=false;
  slides = [
    { image: 'https://t3.ftcdn.net/jpg/02/95/51/80/360_F_295518052_aO5d9CqRhPnjlNDTRDjKLZHNftqfsxzI.jpg', title: 'Neurology', description: 'Advanced brain and nerve care.', duration: 3 },
    { image: 'https://t3.ftcdn.net/jpg/02/60/04/08/360_F_260040863_fYxB1SnrzgJ9AOkcT0hoe7IEFtsPiHAD.jpg', title: 'Cardiology', description: 'Expert care for heart health.', duration: 4 },
    { image: 'https://thumbs.dreamstime.com/b/confident-female-doctor-office-desk-sitting-smiling-camera-health-care-prevention-concept-56351853.jpg', title: 'Pediatrics', description: 'Comprehensive care for children.', duration: 5 },
    { image: 'https://t4.ftcdn.net/jpg/03/20/52/31/360_F_320523164_tx7Rdd7I2XDTvvKfz2oRuRpKOPE5z0ni.jpg', title: 'Neurology', description: 'Advanced brain and nerve care.', duration: 3 },
    { image: 'https://www.shutterstock.com/image-photo/portrait-female-doctor-asian-physician-260nw-2465771411.jpg', title: 'Pediatrics', description: 'Comprehensive care for children.', duration: 5 }
  ];

  swiperConfig: SwiperOptions = {
    slidesPerView: 1,
    spaceBetween: 20,
    loop: true,
    autoplay: {
      delay: 3000, // Default delay, adjust if needed
      disableOnInteraction: false
    },
    pagination: {
      clickable: true,
    },
    navigation: true,
    breakpoints: {
      640: { slidesPerView: 1 },
      768: { slidesPerView: 2 },
      1024: { slidesPerView: 3 }
    }
  };

  onSlideChange(swiper: any) {
    const currentIndex = swiper.realIndex;
    const duration = this.slides[currentIndex]?.duration || 3000; // Default to 3000ms if no duration is set
    swiper.params.autoplay.delay = 1000 * duration; // Set delay in milliseconds
    swiper.autoplay.start(); // Restart autoplay with new delay
  }
  bookAppointmentClicked(){
    console.log("Book Appointment is    Clciked")
    this.openBookAppointment=!this.openBookAppointment;
  }
}
