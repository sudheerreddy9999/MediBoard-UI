import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayDoctorsComponent } from './display-doctors.component';

describe('DisplayDoctorsComponent', () => {
  let component: DisplayDoctorsComponent;
  let fixture: ComponentFixture<DisplayDoctorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DisplayDoctorsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DisplayDoctorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
