import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import timeGridPlugin from '@fullcalendar/timegrid';
import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import { LoaderComponent } from '../../components/loader/loader.component';
import { ModalComponent } from '../../components/modal/modal.component';
import { environment } from '../../../environments/environment';
import * as moment from 'moment';
import 'moment-timezone';

@Component({
  selector: 'app-doctors',
  standalone: true,
  imports: [MatIconModule, FormsModule, CommonModule, FullCalendarModule,LoaderComponent,ModalComponent],
  templateUrl: './doctors.component.html',
  styleUrl: './doctors.component.css'
})
export class DoctorComponent implements OnInit {
  @Output() dataFromSchedule = new EventEmitter<string>();
  private apiUrl:string = environment.apiBaseUrl;
  selectedEvent: any = null;
  isModalOpen = false;
  scheduleInput: string = 'doctors';
  generateSlot: boolean = false;
  currentDoctor: string = '';
  currentOpenedModal: string = '';
  currentComponent = 'doctors';
  searchContent=""
  formTitle="Add New Schedule"
  previousEditCliked=false;
  activateLoader:boolean =false;
  loaderMessage ='Loading.....'
  isErrorModal:boolean=false
  typeofModal:string ='success'
  errorModalMessage ='Error'
  doctorsData: any[] = [];
  filteredContent: any[] =[]
  formInputFeilds = {
    title: '',
    start: '',
    end: '',
    description: '',
    slot_id: '',
    slot_date:'',
    available_slots: '',
  };
  slotDetails: any = {
    doctor_id: 0,
    slot_date: '',
    slot_time: '',
    slot_end_time: '',
    available_slots: 0,
  };
  ngOnInit(): void {
    this.http.get<any>(`${this.apiUrl}/doctors/all`).subscribe({
      next: (response) => {
        if (response?.doctorData) {
          this.doctorsData = response.doctorData;
          this.filteredContent = response.doctorData;
        } else {
          console.warn('No doctor data available in the response.');
        }
      },
      error: (error) => {
        console.error('Failed to fetch doctors:', error.message || error);
        this.activateLoader = false;
        this.isErrorModal = true
        this.errorModalMessage =error.error.message || error
        // Optional: You can show an error message to the user here
      },
      complete: () => {
        console.log('API request completed.');
      }
    });
  }
  onSerach(){
    if(this.searchContent ==''){
     this.filteredContent = this.doctorsData
    }else{
      this.filteredContent = this.doctorsData.filter(doctor => {
        return doctor.name.toLowerCase().includes(this.searchContent.toLowerCase());
      });
    }
  }
  sendToEmployee() {
    this.dataFromSchedule.emit(this.scheduleInput);
  }
  closeScheduleModal() {
    this.generateSlot = !this.generateSlot;
  }
  calendarOptions: any = {
    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin, timeGridPlugin],
    height: 'auto',
    dateClick: this.handleDateClick.bind(this),
    eventClick: this.handleEventClick.bind(this),
    events: [],
    eventTimeFormat: {
      hour: 'numeric',
      minute: '2-digit',
      meridiem: 'short',
      hour12: true,
    },
    eventContent: function (info: any) {
      const startTime = info.event.start.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
      });
      const endTime = info.event.end.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
      });
      const title = info.event.title;
      const description = info.event.extendedProps.description || 'No description';
      const isSunday = info.event.start.getDay() === 0;
    
      // Determine if the event is completed
      const now = new Date();
      const isCompleted = info.event.end < now;
    
      // Function to generate random colors for ongoing events
      const getRandomColor = () => {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
          color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
      };
    
      // Set different styles and behavior for completed events
      const randomColor = getRandomColor();
      const eventClass = isCompleted ? 'bg-white text-gray-500 cursor-not-allowed' : '';
      const pointerEvents = isCompleted ? 'pointer-events-none' : 'cursor-pointer';
      const editableAttr = isCompleted ? 'pointer-events-none' : '';
      const backgroundColor = isCompleted ? 'white' : randomColor;
    
      // Ensure tooltip positioning doesn't get hidden behind other boxes
      const tooltipPositionClass = isSunday
        ? 'right-0 transform translate-x-full'
        : 'left-0 transform -translate-x-full'; 
    
      // New logic to prevent tooltip from being cut off on Sunday
      const tooltipBoundaryCheckClass = isSunday
        ? 'right-0 transform translate-x-[calc(100%+10px)]' // Pushes tooltip more to the right
        : tooltipPositionClass; // Keeps the left side positioning for other days
    
      return {
        html: `
          <div class="relative p-2 ${eventClass} border border-gray-300 rounded-lg shadow-sm cursor-pointer overflow-visible group" ${editableAttr} style="background-color: ${backgroundColor};">
            <!-- Truncated Event Title and Time -->
            <div class="flex items-center space-x-2 w-[180px]">
              <span class="text-xs text-gray-800 dark:text-gray-200">${startTime} - ${endTime}</span>
              <span class="text-xs font-medium text-gray-900 dark:text-gray-100 flex-1 truncate overflow-hidden text-ellipsis whitespace-nowrap">${title}</span>
            </div>
            <!-- Tooltip with full details -->
            <div class="absolute z-50 top-1/2 ${tooltipBoundaryCheckClass} -translate-y-1/2 bg-gray-900 text-white text-xs rounded-lg p-3 shadow-lg opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-hover:visible max-w-xs">
              <div><p class="font-xs">${title}</p></div>
              <div><span>${startTime} - ${endTime}</span></div>
              <div><span>${description}</span></div>
            </div>
          </div>
        `,
      };
    },       
  };
  constructor(private http: HttpClient) {}
  handleDateClick(arg: any) {
    // Change view to 'timeGridDay' and set the date to the clicked date
    this.calendarOptions = {
      ...this.calendarOptions,
      initialView: 'timeGridDay',
      initialDate: arg.dateStr, // Focus the clicked date
    };
  }
  toggleComponnet( docName: string, docId: number) {
    this.activateLoader = true;
    this.loaderMessage=`Loading... ${docName}'s Schedule`
    this.generateSlot = true;
    if (this.generateSlot) {
      this.currentDoctor = docName;
      this.slotDetails.doctor_id = docId;
      this.http
        .get<any>(`${this.apiUrl}/slots/doctor`, {
          headers: {
            doctor_id: this.slotDetails.doctor_id,
          },
        })
        .subscribe({
          next: (response) => {
            this.activateLoader = false;
            this.calendarOptions.events = response.slots;
          },
          error: (error) => {
            console.error('API Error:', error); // Handle the error
            this.activateLoader = false;
            this.isErrorModal = true
            this.errorModalMessage =error.error.message || error
          },
          complete: () => {
            console.log('API request completed successfully.'); // Optional: Handle completion if needed
          },
        });
    }
  }
  openSlotModal(add: string) {
    this.currentOpenedModal = add;
    this.formTitle ="Add New Schedule"
    this.isModalOpen = !this.isModalOpen;
    // this.http.post(`${this.apiUrl}/`)
  }
  handleEventClick(arg: any) {
    this.formTitle = "Edit Schedule";
    this.selectedEvent = arg.event;
  
    // Convert the event start date to IST
    const startDate = moment.tz(this.selectedEvent.start, 'Asia/Kolkata'); // IST timezone
  
    // Format the slot date as 'YYYY-MM-DD'
    const slotDateString = startDate.format('YYYY-MM-DD'); 
  
    // Get the current date and time in IST
    const currentDateTime = moment.tz('Asia/Kolkata'); // Current time in IST
  
    // Check if the selected date is before today
    if (startDate.isBefore(currentDateTime, 'day')) {
      this.previousEditCliked=true;
    } else if (startDate.isSame(currentDateTime, 'day') && startDate.isBefore(currentDateTime)) {
      this.previousEditCliked=true;
    } else {
      this.previousEditCliked=false;
    }
  
    // Format the start and end times using Moment.js
    const startTimeString = startDate.format('HH:mm'); // Format to 'HH:mm'
    const endTimeString = startDate.add(1, 'hour').format('HH:mm'); // Assuming an end time for illustration
  
    // Update formInputFeilds with formatted values
    this.formInputFeilds = {
      title: this.selectedEvent.title,
      start: startTimeString,
      end: endTimeString,
      description: this.selectedEvent.extendedProps.description,
      slot_id: this.selectedEvent.extendedProps.slot_id,
      slot_date: slotDateString,
      available_slots: this.selectedEvent.extendedProps.available_slots,
    };
  
    this.isModalOpen = true; // Open the modal
  }
  saveEvent() {
    this.activateLoader = true;
    const body = {
      doctor_id: this.slotDetails.doctor_id || null,
      slot_id: this.formInputFeilds.slot_id || null,
      available_slots: this.formInputFeilds.available_slots,
      slot_date: this.formInputFeilds.slot_date,
      slot_time: this.formInputFeilds.start,
      slot_end_time: this.formInputFeilds.end,
      title: this.formInputFeilds.title,
      description: this.formInputFeilds.description,
    };
    if (body.slot_id) {
      this.http.put(`${this.apiUrl}/slots`, body).subscribe({
        next: (response) => {
          this.formInputFeilds = {
            title: '',
            start: '',
            end: '',
            description: '',
            slot_id: '',
            slot_date:'',
            available_slots: '',
          };
          this.toggleComponnet(this.currentDoctor, this.slotDetails.doctor_id)
          this.activateLoader = false;
        },
        error: (error) => {  
          console.error('Error updating event:', error);
          console.log(error.error.message)
          this.isErrorModal = true
          this.activateLoader = false;
          this.errorModalMessage =error.error.message || error
        },
        complete: () => {
          console.log('Event update completed.');
        },
      });
    } else {
      this.http.post(`${this.apiUrl}/slots`, body).subscribe({
        next: (response) => {
          this.formInputFeilds = {
            title: '',
            start: '',
            end: '',
            description: '',
            slot_id: '',
            slot_date:'',
            available_slots: '',
          };
          this.toggleComponnet(this.currentDoctor, this.slotDetails.doctor_id)
          this.activateLoader = false;
        },
        error: (error) => {
          console.error('Error updating event:', error);
          this.activateLoader = false;
          this.isErrorModal = true
          this.errorModalMessage =error.error.message || error
        },
        complete: () => {
          console.log('Event update completed.');
        },
      });
    }
    this.isModalOpen = false; // Close the modal
  }
  closeModal() {
    this.isModalOpen = false;
  }
}
