import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RaceCountdownTimerComponent } from './race-countdown-timer.component';

describe('RaceCountdownTimerComponent', () => {
  let component: RaceCountdownTimerComponent;
  let fixture: ComponentFixture<RaceCountdownTimerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RaceCountdownTimerComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RaceCountdownTimerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
