import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'rf-settings-dialog',
  templateUrl: './settings-dialog.component.html',
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SettingsDialogComponent implements OnInit {

  disableSetup: boolean;

  constructor(private dialogRef: MatDialogRef<SettingsDialogComponent>) {
  }

  ngOnInit(): void {
    this.disableSetup = localStorage.getItem('betterUi.disableSetup') === 'true';
  }

  save(): void {
    if (this.disableSetup) {
      localStorage.setItem('betterUi.disableSetup', 'true');
    } else {
      localStorage.removeItem('betterUi.disableSetup');
    }
    this.dialogRef.close();
  }

  close(): void {
    this.dialogRef.close();
  }

}
