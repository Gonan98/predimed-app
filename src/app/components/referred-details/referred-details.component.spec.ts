import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReferredDetailsComponent } from './referred-details.component';

describe('ReferredDetailsComponent', () => {
  let component: ReferredDetailsComponent;
  let fixture: ComponentFixture<ReferredDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReferredDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReferredDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
