import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicProfileComponent } from './medic-profile.component';

describe('MedicProfileComponent', () => {
  let component: MedicProfileComponent;
  let fixture: ComponentFixture<MedicProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MedicProfileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MedicProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
