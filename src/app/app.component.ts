import { Component,OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MainComponent } from './main/main.component';
import { MatIconModule } from '@angular/material/icon';
import { NavComponent } from './nav/nav.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import { HomepageComponent } from './homepage/homepage.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from './shared/auth.service';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer/footer.component';

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
  constructor(private AuthService:AuthService){}
  ngOnInit() {
    this.AuthService.selectedEmployeeDropDown$.subscribe((message: boolean) => {
      this.employeeLogin = message;
    });
}
}

