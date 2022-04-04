import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncidenceCreateComponent } from './incidence-create.component';

describe('IncidenceCreateComponent', () => {
  let component: IncidenceCreateComponent;
  let fixture: ComponentFixture<IncidenceCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IncidenceCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IncidenceCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
