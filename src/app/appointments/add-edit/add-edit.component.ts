import { Component, OnInit, AfterViewInit ,Output,EventEmitter} from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { DoctorsComponent } from '../doctors/doctors.component';
import { CommonModule } from '@angular/common';
import { CalendarModule } from 'primeng/calendar';
import { TimeFormatPipe } from '../../pipes/time-format.pipe';
import flatpickr from 'flatpickr';
import { format } from 'date-fns';
import { __param } from 'tslib';


@Component({
  selector: 'app-add-edit',
  standalone: true,
  imports: [CommonModule,DoctorsComponent,FormsModule,CalendarModule,TimeFormatPipe],
  templateUrl: './add-edit.component.html',
  styleUrls: ['./add-edit.component.css'] // Corrected the property name
})
export class AddEditComponent implements OnInit, AfterViewInit {
  appointmentFormData:any={
    id: "",
    doctor_id: "",
    patient_id: "",
    appointment_date: "",
    appointment_time: "",
    patient_firstname:"",
    patient_lastname:"",
    find_doctor:"",
    email:"",
    phone_number:"",
    date_of_bith:"",
    doctor_name:"",
  }
  currentDoctorSlots:any[] =[];
  currentDayDoctorSlots:any[] =[];
  userSelectedSlot:any=0;

  ngOnInit(): void {
    // You can initialize any necessary data here
  }
  constructor(private http:HttpClient){}
  issearchDoctor:boolean=false;
  ngAfterViewInit(): void {
    if (typeof window !== "undefined") {
      flatpickr("#datepicker", {
        allowInput: true, // Allow input without closing the calendar
        static: true, // Keep the calendar always visible on the UI
        onReady: (selectedDates, dateStr, instance) => {
          instance.open(); // Open the calendar on initialization
        },
        onChange: (selectedDates, dateStr, instance) => {
          instance.open(); // Reopen the calendar after selection
          this.getSlots(selectedDates)
        }
      });      
    }
  }
  getSlots(selectedDates: Date[]){
    console.log(selectedDates);
    console.log("slaots are")
  }

onDateChange(event: Date[] | Date) {
  if (Array.isArray(event)) {
    if (event.length > 0) {
      const selectedDate = event[0];
      const formattedDate = format(selectedDate, 'yyyy-MM-dd');
      this.currentDayDoctorSlots = this.currentDoctorSlots.filter((x) => {
        if(x.slot_date===formattedDate){
          console.log(x,"It is true")
        }
      });
      
      console.log(this.currentDayDoctorSlots);
    } else {
      console.error('No dates provided in the array');
    }
  } else if (event instanceof Date) {
    // If event is a single Date object
    const formattedDate = format(event, 'yyyy-MM-dd');
    
    console.log(formattedDate, "Formatted Date");

    // Use the formatted date in your logic as needed
    this.currentDayDoctorSlots = this.currentDoctorSlots.filter((x) => {
      if(x.slot_date===formattedDate){
        console.log(x,"It is true")
        return x
      }
    });
    
    console.log(this.currentDayDoctorSlots);
  } else {
    console.error('Unexpected event type:', typeof event);
  }
}

  openDoctorsModal(){
    console.log("I got clickded")
    this.issearchDoctor = !this.issearchDoctor
  }
  handelDoctorsClose(evnet:boolean){
    this.issearchDoctor =false;
  }
  doctorValueChanged(){
    console.log("I gor added Here How are you")
    console.log(this.appointmentFormData.doctor_id)
  }
  handleAppointmentData(event:any){
    console.log(event)
    this.issearchDoctor=false;
    this.appointmentFormData.doctor_id=event.id
    this.appointmentFormData.doctor_name=event.name
    console.log(this.appointmentFormData.doctor_id)
    this.getDoctorSlots()
  }
  getDoctorSlots(){
    const headers = new HttpHeaders({
      doctor_id: this.appointmentFormData.doctor_id
    });
   this.http.get<any>('http://localhost:3000/slots',{ headers }).subscribe({
    next: (data) => {
      this.currentDoctorSlots = data.slots;
   },
  error: (error) => {
    console.error(error);
  },
complete: () => {
  console.log('Request completed');
}})
}
  bookAppointment(){
    console.log(this.appointmentFormData)
    const body = {
      "name": this.appointmentFormData.patient_firstname,
      "mobile_number":this.appointmentFormData.phone_number,
      "email":this.appointmentFormData.email,
      "slot_id":this.userSelectedSlot
    }
    console.log(body);
    this.http.post('http://localhost:3000/appointments/guest',body).subscribe({
      next: (data) => {
        console.log(data)
    },
      error: (error) => {
        console.log(error.message)
    },
  complete: () => {
    console.log('Request completed');
  }})
}
  selectTimeSlotIf( slot_id:any){
    console.log(slot_id)
    this.userSelectedSlot=slot_id
  }
}
