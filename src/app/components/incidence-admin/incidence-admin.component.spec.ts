import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncidenceAdminComponent } from './incidence-admin.component';

describe('IncidenceComponent', () => {
  let component: IncidenceAdminComponent;
  let fixture: ComponentFixture<IncidenceAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IncidenceAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IncidenceAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
