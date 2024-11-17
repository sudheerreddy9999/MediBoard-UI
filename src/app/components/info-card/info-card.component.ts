import { Component,Input,Output,EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIcon } from '@angular/material/icon';

export interface BoxInfo {
  name: string;
  image: string;
  heading: string;
  subHeading: string;
  description: string;
  hoverMessage: string;
}

@Component({
  selector: 'app-info-card',
  standalone: true,
  imports: [CommonModule,MatIcon],
  templateUrl: './info-card.component.html',
  styleUrl: './info-card.component.css'
})
export class InfoCardComponent {
  @Input() boxesInfo: BoxInfo[] = [];
  @Output() selectedBox = new EventEmitter<string>();
  loggedInUser:boolean = true
  loginClick(){
    console.log(`login is clicked`);
  }
    userPrefClicked(heading: string) {
      console.log(`User preference clicked is: ${heading}`);
      this.selectedBox.emit(heading)
    }
    
}
