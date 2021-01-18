import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RfButtonComponent } from './rf-button.component';

describe('RfButtonComponent', () => {
  let component: RfButtonComponent;
  let fixture: ComponentFixture<RfButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RfButtonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RfButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
