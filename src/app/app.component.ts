import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MainComponent } from './main/main.component';
import { MatIconModule } from '@angular/material/icon';
import { NavComponent } from './nav/nav.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import { HomepageComponent } from './homepage/homepage.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FooterComponent } from './footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MainComponent, MatIconModule, NavComponent, FullCalendarModule,HomepageComponent,ReactiveFormsModule,FooterComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'], // Changed 'styleUrl' to 'styleUrls'
})
export class AppComponent {
  title = 'hospital-management';
}
