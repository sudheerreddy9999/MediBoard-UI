import { Component,Input } from '@angular/core';

@Component({
  selector: 'app-error',
  standalone: true,
  imports: [],
  templateUrl: './error.component.html',
  styleUrl: './error.component.css'
})
export class ErrorComponent {
  @Input() mainText: string="No Record Found"
  @Input() subText:string = "No data found for current context "
}
