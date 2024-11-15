import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointmentcardComponent } from './appointmentcard.component';

describe('AppointmentcardComponent', () => {
  let component: AppointmentcardComponent;
  let fixture: ComponentFixture<AppointmentcardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppointmentcardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppointmentcardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
