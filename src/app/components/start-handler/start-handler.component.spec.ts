import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StartHandlerComponent } from './start-handler.component';

describe('StartHandlerComponent', () => {
  let component: StartHandlerComponent;
  let fixture: ComponentFixture<StartHandlerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StartHandlerComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StartHandlerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
