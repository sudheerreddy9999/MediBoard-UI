import { Component } from '@angular/core';
import { MatCommonModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { Route,Router } from '@angular/router';

@Component({
  selector: 'app-previous-records',
  standalone: true,
  imports: [MatCommonModule,MatIconModule],
  templateUrl: './previous-records.component.html',
  styleUrl: './previous-records.component.css'
})
export class PreviousRecordsComponent {
  constructor (private route:Router){}
  handleReturn(){
    this.route.navigate(['/Patient'])
  }
}
