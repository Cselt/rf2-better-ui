import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventHandlerComponent } from './event-handler.component';

describe('EventHandlerComponent', () => {
  let component: EventHandlerComponent;
  let fixture: ComponentFixture<EventHandlerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EventHandlerComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EventHandlerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
