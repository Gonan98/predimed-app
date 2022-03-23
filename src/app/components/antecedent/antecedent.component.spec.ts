import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AntecedentComponent } from './antecedent.component';

describe('AntecedentComponent', () => {
  let component: AntecedentComponent;
  let fixture: ComponentFixture<AntecedentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AntecedentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AntecedentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
