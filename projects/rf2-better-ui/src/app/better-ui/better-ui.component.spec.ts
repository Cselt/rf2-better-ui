import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BetterUiComponent } from './better-ui.component';

describe('BetterUiComponent', () => {
  let component: BetterUiComponent;
  let fixture: ComponentFixture<BetterUiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BetterUiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BetterUiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
