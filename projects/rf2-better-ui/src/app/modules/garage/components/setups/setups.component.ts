import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { select, Store } from '@ngrx/store';
import * as GarageActions from '../../state/garage.actions';
import { Setup } from '../../interfaces/setup';
import * as GarageSelectors from '../../state/garage.selectors';
import { Observable } from 'rxjs';

@Component({
  selector: 'rf-setups',
  templateUrl: './setups.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SetupsComponent implements OnInit {

  public setups$: Observable<Setup[]> = this.store.pipe(select(GarageSelectors.selectSetups));
  public setupName$: Observable<string> = this.store.pipe(select(GarageSelectors.selectCurrentSetupName));
  public notes$: Observable<string> = this.store.pipe(select(GarageSelectors.selectCurrentNotes));
  public showingOnlyRelevant$: Observable<boolean> = this.store.pipe(select(GarageSelectors.showingOnlyRelevant));

  constructor(private dialogRef: MatDialogRef<SetupsComponent>,
              private store: Store) {
  }

  ngOnInit(): void {
    this.store.dispatch(GarageActions.loadSetups());
    this.store.dispatch(GarageActions.loadSetupSummary());
    this.store.dispatch(GarageActions.loadShowingRelevant());
  }

  loadSelected(): void {
    this.store.dispatch(GarageActions.loadSavedSetup());
    this.close();
  }

  close(): void {
    this.dialogRef.close();
  }

  selectSetup(setup: Setup): void {
    this.store.dispatch(GarageActions.selectSetup({setup}));
  }

  changeShowOnlyRelevant(show: boolean): void {
    this.store.dispatch(GarageActions.changeShowOnlyRelevant({showOnlyRelevant: show}));
  }
}
