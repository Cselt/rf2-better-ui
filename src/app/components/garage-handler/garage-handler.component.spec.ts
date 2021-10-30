import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GarageHandlerComponent } from './garage-handler.component';

describe('GarageHandlerComponent', () => {
  let component: GarageHandlerComponent;
  let fixture: ComponentFixture<GarageHandlerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GarageHandlerComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GarageHandlerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
