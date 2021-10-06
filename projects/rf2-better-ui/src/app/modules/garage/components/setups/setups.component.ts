import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import * as GarageActions from '../../state/garage.actions';
import { Setup } from '../../interfaces/setup';
import * as GarageSelectors from '../../state/garage.selectors';
import { Observable } from 'rxjs';

@Component({
  selector: 'rf-setups',
  templateUrl: './setups.component.html',
  styleUrls: ['./setups.component.scss']
})
export class SetupsComponent implements OnInit {

  public setups$: Observable<Setup[]>;

  public selected: Setup;

  constructor(private dialogRef: MatDialogRef<SetupsComponent>,
              private store: Store) {
    this.setups$ = this.store.select(GarageSelectors.selectSetups);
  }

  ngOnInit(): void {
    this.store.dispatch(GarageActions.loadSetups());
  }

  loadSelected(): void {
    this.store.dispatch(GarageActions.loadSavedSetup(this.selected));
  }
}
