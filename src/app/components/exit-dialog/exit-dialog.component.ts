import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'rf-exit-dialog',
  templateUrl: './exit-dialog.component.html',
  styleUrls: ['./exit-dialog.component.scss']
})
export class ExitDialogComponent {

  constructor(private dialogRef: MatDialogRef<ExitDialogComponent>,
              private http: HttpClient) {
  }

  close(): void {
    this.dialogRef.close();
  }

  exit(): void {
    this.http.post('/rest/start/quitGame', undefined).subscribe();
  }

}
