import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncidenceDetailsComponent } from './incidence-details.component';

describe('IncidenceDetailsComponent', () => {
  let component: IncidenceDetailsComponent;
  let fixture: ComponentFixture<IncidenceDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IncidenceDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IncidenceDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
