import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SetupsComponent } from './modules/garage/components/setups/setups.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'rf2-better-ui';

  constructor(private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.dialog.open(SetupsComponent);
  }

  openDialog(): void {
    this.dialog.open(SetupsComponent);
  }
}
