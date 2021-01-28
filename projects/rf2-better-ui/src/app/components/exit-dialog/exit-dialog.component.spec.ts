import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExitDialogComponent } from './exit-dialog.component';

describe('ExitDialogComponent', () => {
  let component: ExitDialogComponent;
  let fixture: ComponentFixture<ExitDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExitDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExitDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
