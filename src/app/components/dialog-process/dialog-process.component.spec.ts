import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogProcessComponent } from './dialog-process.component';

describe('DialogProcessComponent', () => {
  let component: DialogProcessComponent;
  let fixture: ComponentFixture<DialogProcessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogProcessComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogProcessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
