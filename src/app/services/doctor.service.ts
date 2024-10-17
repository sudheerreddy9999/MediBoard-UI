import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';

interface Doctor {
  [key: string]: any; // Define more specific properties if known
}

interface ApiResponse {
  message: string; // Expected message from the server
  doctorData: Doctor[]; // Updated to match the response structure
}

@Injectable({
  providedIn: 'root'
})
export class DoctorService {
  private doctors: Doctor[] | null = null;
  private apiUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  fetchDoctors(): Observable<ApiResponse> {
    if (this.doctors) {
      // Return cached data with updated property name
      return of({ message: 'Data fetched from cache', doctorData: this.doctors });
    } else {
      return this.http.get<ApiResponse>(`${this.apiUrl}/doctors/all`).pipe(
        tap((data) => {
          console.log(data, "Fetched doctors data");
          this.doctors = data.doctorData; // Store the doctors array in the class property
          console.log(this.doctors, "Stored doctors data");
        }),
        catchError((error) => {
          console.error('Error fetching doctors data:', error);
          // Return an object with an empty array on error
          return of({ message: 'Error fetching data', doctorData: [] });
        })
      );
    }
  }
}
