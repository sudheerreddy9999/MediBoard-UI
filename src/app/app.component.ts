import { Component,OnInit } from '@angular/core';
import { RouterOutlet,Router,ActivatedRoute, NavigationEnd } from '@angular/router';

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
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
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
  currentuser = '';
  currentUser = ''
  currentRoute: string = '';
  private apiUrl:string = environment.apiBaseUrl
  constructor(private AuthService:AuthService,private router: Router,private http:HttpClient){}
  ngOnInit() {
    this.http.get(`${this.apiUrl}/health`).subscribe(({
      next: (response) => {
        console.log(`api called Sucessfull`)
      }
    }))
    this.AuthService.employeeLoginStatus$.subscribe((status) => {
      if (status === true) {
        this.intialRendering()
      } else {
      }
    })
    this.AuthService.selectedEmployeeDropDown$.subscribe((message: boolean) => {
      this.employeeLogin = message;
    });
    this.intialRendering()
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      console.log(this.currentUser)
      console.log(this.currentUser, " Cutrrent user value is ")
     if(this.currentUser=="employee") this.router.navigate(['/Employee'])
      this.currentRoute = this.router.url; 
    });
}

intialRendering (){
  if (typeof window !== 'undefined' && window.localStorage) {
    const storedData = localStorage.getItem('mediboard') || '';
    this.currentUser = storedData
    if (storedData) {
      if(JSON.parse(storedData).userDetails.userId){
        // this.router.navigate(['/Patient']);
        this.currentUser = 'patient';
      }else if(JSON.parse(storedData).employeeDetails.employeeId){
        this.currentUser = 'employee';
        this.router.navigate(['/Employee']);
      }else{
        this.currentUser = 'patient';
        // this.router.navigate(['/Patient']);
      }
    }else{
      // this.router.navigate(['/Patient']);
      this.currentUser = 'patient';
    }
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        const fullUrl = this.router.url;
        const segment = fullUrl.split('/');
        if(segment[1] === "Employee"){
          this.employeeLogin =true
        }
      });
  }
}

}

