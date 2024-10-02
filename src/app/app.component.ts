import { Component,OnInit } from '@angular/core';
import { RouterOutlet,Router, NavigationEnd } from '@angular/router';

import { MainComponent } from './main/main.component';
import { MatIconModule } from '@angular/material/icon';
import { NavComponent } from './nav/nav.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import { HomepageComponent } from './homepage/homepage.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from './shared/auth.service';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer/footer.component';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MainComponent, MatIconModule,CommonModule, NavComponent, FullCalendarModule,HomepageComponent,ReactiveFormsModule,FooterComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'], // Changed 'styleUrl' to 'styleUrls'
})
export class AppComponent implements OnInit {
  title = 'hospital-management';
  employeeLogin =false;
  constructor(private AuthService:AuthService,private router: Router,){}
  ngOnInit() {
    if (typeof window !== 'undefined' && window.localStorage) {
      // const storedData: string = localStorage.getItem('mediboard') || '';
      // // if (storedData) {
      // //   this.userInfo = JSON.parse(storedData);
      // // }
      this.router.events
        .pipe(filter((event) => event instanceof NavigationEnd))
        .subscribe(() => {
          const fullUrl = this.router.url;
          const segment = fullUrl.split('/');
          console.log(segment,"Segment Valueis ")
          if(segment[1] === "Employee"){
            console.log("hello How are you")
            this.employeeLogin =true
          }
        });
    }
    this.AuthService.selectedEmployeeDropDown$.subscribe((message: boolean) => {
      this.employeeLogin = message;
      console.log(this.employeeLogin,"Hello")
    });
}
}

