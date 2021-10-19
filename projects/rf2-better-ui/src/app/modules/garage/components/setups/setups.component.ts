import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { select, Store } from '@ngrx/store';
import * as GarageActions from '../../state/garage.actions';
import { Setup } from '../../interfaces/setup';
import * as GarageSelectors from '../../state/garage.selectors';
import { Observable } from 'rxjs';
import { DeleteConfirmPopupComponent } from '../delete-confirm-popup/delete-confirm-popup.component';

@Component({
  selector: 'rf-setups',
  templateUrl: './setups.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SetupsComponent implements OnInit {

  public setups$: Observable<Setup[]> = this.store.pipe(select(GarageSelectors.selectSetups));
  public setupsLoading$: Observable<boolean> = this.store.pipe(select(GarageSelectors.selectSetupsLoading));
  public setupName$: Observable<string> = this.store.pipe(select(GarageSelectors.selectDisplayedSetupName));
  public activeSetupName$: Observable<string> = this.store.pipe(select(GarageSelectors.selectActiveSetupName));
  public notes$: Observable<string> = this.store.pipe(select(GarageSelectors.selectCurrentNotes));
  public showingOnlyRelevant$: Observable<boolean> = this.store.pipe(select(GarageSelectors.showingOnlyRelevant));

  constructor(private dialogRef: MatDialogRef<SetupsComponent>,
              private store: Store,
              private dialog: MatDialog) {
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

  deleteSelected(setupName: string): void {
    this.dialog.open(DeleteConfirmPopupComponent, {
      panelClass: ['noDialogPadding', 'rfPanel'],
      data: {setupName}
    })
      .afterClosed()
      .subscribe((confirmed: boolean) => {
        if (confirmed) {
          this.store.dispatch(GarageActions.deleteSelectedSetup());
        }
      });
  }
}
