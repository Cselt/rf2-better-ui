import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiplayerHandlerComponent } from './multiplayer-handler.component';

describe('MultiplayerHandlerComponent', () => {
  let component: MultiplayerHandlerComponent;
  let fixture: ComponentFixture<MultiplayerHandlerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MultiplayerHandlerComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MultiplayerHandlerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
