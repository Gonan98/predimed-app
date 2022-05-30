import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogExamComponent } from './dialog-exam.component';

describe('DialogExamComponent', () => {
  let component: DialogExamComponent;
  let fixture: ComponentFixture<DialogExamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogExamComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogExamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
