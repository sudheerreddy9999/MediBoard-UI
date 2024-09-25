import { Component, CUSTOM_ELEMENTS_SCHEMA,AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SwiperOptions } from 'swiper/types';
import { AddEditComponent } from '../appointments/book-appointments/add-edit.component';

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
    { image: '/images/carousel/carousel-1.jpg', title: 'Neurology', description: 'Advanced brain and nerve care.', duration: 3 },
    { image: '/images/carousel/carousel-4.jpg', title: 'Cardiology', description: 'Expert care for heart health.', duration: 4 },
    { image: '/images/carousel/carousel-3.jpg', title: 'Pediatrics', description: 'Comprehensive care for children.', duration: 5 },
    { image: '/images/carousel/carousel-2.jpg', title: 'Neurology', description: 'Advanced brain and nerve care.', duration: 3 },
    { image: '/images/carousel/carousel-5.jpg', title: 'Pediatrics', description: 'Comprehensive care for children.', duration: 5 }
  ];
  swiperConfig: SwiperOptions = {
    slidesPerView: 1,
    spaceBetween: 20,
    loop: true,
    autoplay: {
      delay: 3000, 
      disableOnInteraction: false
    },
    pagination: {
      clickable: true
    },
    navigation: true,
    breakpoints: {
      640: { slidesPerView: 1 },
      768: { slidesPerView: 2 },
      1024: { slidesPerView: 3 }
    }
  };
  
  ngAfterViewInit() {
  }
  onSwiper(swiper: any) {
    // This method will be called when the swiper instance is ready
    console.log("Helllo i am inside swiper")
    swiper.autoplay.start(); // Ensure autoplay starts when the Swiper is initialized
  }


  onSlideChange(swiper: any) {
    const currentIndex = swiper.realIndex;
    const duration = this.slides[currentIndex]?.duration || 3000; // Default to 3000ms if no duration is set
    swiper.params.autoplay.delay = duration * 1000; // Set delay in milliseconds
    swiper.autoplay.start(); // Restart autoplay with new delay
  }

  bookAppointmentClicked(){
    console.log("Book Appointment is    Clciked")
    this.openBookAppointment=!this.openBookAppointment;
  }
  handleCloseAppointment(){
    this.openBookAppointment = false;
  }
}
