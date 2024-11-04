import { Component,Input,OnInit,Output,EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [MatIconModule,CommonModule],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css'
})
export class ModalComponent implements OnInit {
  @Output() closeModalEmit = new EventEmitter<boolean>();

  @Input() message:string =''
  @Input() typeOfModal:String =''
  openModal:boolean=true;
  closeModal(){
    this.typeOfModal =''
    this.closeModalEmit.emit(false);
  }
  ngOnInit():void{
    if(this.typeOfModal ==='success'){
      setTimeout(()=>{
        this.typeOfModal ='';
      },3000)
    }
  }
}

