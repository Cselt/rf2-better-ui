import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RaceHandlerComponent } from './race-handler.component';

describe('RaceHandlerComponent', () => {
  let component: RaceHandlerComponent;
  let fixture: ComponentFixture<RaceHandlerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RaceHandlerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RaceHandlerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
