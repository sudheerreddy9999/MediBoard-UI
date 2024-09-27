import { Component, OnInit, AfterViewInit ,Output,EventEmitter} from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { DoctorsComponent } from '../doctors/doctors.component';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule,ReactiveFormsModule, Validators } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { CalendarModule } from 'primeng/calendar';
import { TimeFormatPipe } from '../../pipes/time-format.pipe';
import flatpickr from 'flatpickr';
import { format } from 'date-fns';
import { __param } from 'tslib';
import { LoaderComponent } from '../../components/loader/loader.component';
import { ModalComponent } from '../../components/modal/modal.component';
import { environment } from '../../../environments/environment';


@Component({
  selector: 'app-add-edit',
  standalone: true,
  imports: [CommonModule,DoctorsComponent,FormsModule,CalendarModule,TimeFormatPipe,MatIcon,MatIconModule,FontAwesomeModule,ReactiveFormsModule,LoaderComponent,ModalComponent],
  templateUrl: './add-edit.component.html',
  styleUrls: ['./add-edit.component.css'] // Corrected the property name
})
export class AddEditComponent implements AfterViewInit {
  private apiUrl:string = environment.apiBaseUrl;
  doctor_id=""
  doctor_name=""
  openLoader=false;
  openModalComponnet: boolean = false;
  modalMessage: string = 'Success';
  typeOfModal: string = 'failure';
  AppointmentData = new FormGroup({
    patient_firstname:new FormControl('sudheer',[
      Validators.required,
      Validators.minLength(2),
      Validators.pattern('^[a-zA-Z ]+$') 
    ]),
    patient_lastname:new FormControl('janga',[
      Validators.required,
      Validators.minLength(2),
      Validators.pattern('^[a-zA-Z ]+$') 
    ]),
    mobile_number: new FormControl('6303896543', [
      Validators.required,
      Validators.pattern('^[0-9]{10}$')
    ]),
    patientEmail: new FormControl('sudheerjanga9999@gmail.com', [
      Validators.required,
      Validators.minLength(4),
      Validators.pattern('^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$')
    ]),
    dateOfBirth: new FormControl('', []),
    find_doctor: new FormControl('', []),
    doctor_name: new FormControl('', [
      Validators.required,
      Validators.minLength(4)
    ]),
    appointmentDate: new FormControl('', [
      Validators.required,
    ]),
    
    
  })
  
  onSubmit() {
    console.log("hello 1232 ")
    if (this.AppointmentData.invalid) {
      this.AppointmentData.markAllAsTouched();
      return;
    }else{
      this.openLoader=true;
      const body = {
        "name": this.AppointmentData.value.patient_firstname,
        "mobile_number":this.AppointmentData.value.mobile_number,
        "email":this.AppointmentData.value.patientEmail,
        "slot_id":this.userSelectedSlot
      }
      console.log(body);
      this.http.post(`${this.apiUrl}/appointments/guest`,body).subscribe({
        next: (data) => {
          console.log(data)
          this.openLoader=false;
          this.handleCloseModel();
      },
        error: (error) => {
          console.log(error.message)
          this.openLoader=false;
          this.openModalComponnet=true
          this.modalMessage=error.message
      },
    complete: () => {
      console.log('Request completed');
    }})
    }
  }
  @Output() closeAppointmentModel = new EventEmitter<boolean>();
  currentDoctorSlots:any[] =[];
  currentDayDoctorSlots:any[] =[];
  userSelectedSlot:any=0;
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
  console.log("I am here for date Cahnge")
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
    console.log(this.doctor_id)
  }
  handleAppointmentData(event:any){
    this.issearchDoctor=false;
    this.doctor_id=event.id
    this.doctor_name=event.name

    this.AppointmentData.get('doctor_name')?.setValue(event.name);
    this.getDoctorSlots()
  }
  getDoctorSlots(){
    const headers = new HttpHeaders({
      doctor_id: this.doctor_id
    });
   this.http.get<any>(`${this.apiUrl}/slots`,{ headers }).subscribe({
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
  selectTimeSlotIf( slot_id:any){
    console.log(slot_id)
    this.userSelectedSlot=slot_id
  }
  handleCloseModel(){
    this.closeAppointmentModel.emit(false);
  }
  handleCloseEmitModal(closeModal: boolean) {
    this.openModalComponnet = closeModal;
  }
}
