import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SetupsComponent } from './modules/garage/components/setups/setups.component';

@Component({
  selector: 'rf-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'rf2-better-ui';

  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {
    this.openDialog();
  }

  openDialog(): void {
    this.dialog.open(SetupsComponent, {
      height: '50vh',
      maxHeight: '90vh',
      width: '70vw'
    });
  }
}
