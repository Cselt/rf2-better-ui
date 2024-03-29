import { ChangeDetectionStrategy, Component, HostBinding, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { select, Store } from '@ngrx/store';
import * as GarageActions from '../../state/garage.actions';
import { Setup } from '../../interfaces/setup';
import * as GarageSelectors from '../../state/garage.selectors';
import { Observable } from 'rxjs';
import { DeleteConfirmPopupComponent } from '../delete-confirm-popup/delete-confirm-popup.component';
import { CopySetupPopupComponent } from '../copy-setup-popup/copy-setup-popup.component';

@Component({
  selector: 'rf-setups',
  templateUrl: './setups.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SetupsComponent implements OnInit {
  @HostBinding('class')
  flexClass: string[] = ['flex', 'flex-col', 'h-full'];

  public setups$: Observable<Setup[]> = this.store.pipe(select(GarageSelectors.selectSetups));
  public setupsLoading$: Observable<boolean> = this.store.pipe(select(GarageSelectors.selectSetupsLoading));
  public setupName$: Observable<string> = this.store.pipe(select(GarageSelectors.selectDisplayedSetupName));
  public activeSetupName$: Observable<string> = this.store.pipe(select(GarageSelectors.selectActiveSetupName));
  public notes$: Observable<string> = this.store.pipe(select(GarageSelectors.selectCurrentNotes));
  public showingOnlyRelevant$: Observable<boolean> = this.store.pipe(select(GarageSelectors.showingOnlyRelevant));
  public compareToSetup$: Observable<string> = this.store.pipe(select(GarageSelectors.selectCompareSetup));
  public currentTrackFolder$: Observable<string> = this.store.pipe(select(GarageSelectors.selectCurrentTrackFolder));
  public setupFolders$: Observable<Setup[]> = this.store.pipe(select(GarageSelectors.selectSetupFolders));

  constructor(private dialogRef: MatDialogRef<SetupsComponent>, private store: Store, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.store.dispatch(GarageActions.loadSetups());
    this.store.dispatch(GarageActions.loadSetupSummary());
    this.store.dispatch(GarageActions.loadShowingRelevant());
    this.store.dispatch(GarageActions.loadCurrentTrackFolder());
  }

  loadSelected(): void {
    this.store.dispatch(GarageActions.loadSavedSetup());
    this.close();
  }

  close(): void {
    this.dialogRef.close();
  }

  selectSetup(setup: Setup): void {
    this.store.dispatch(GarageActions.selectSetup({ setup }));
  }

  changeShowOnlyRelevant(show: boolean): void {
    this.store.dispatch(GarageActions.changeShowOnlyRelevant({ showOnlyRelevant: show }));
  }

  deleteSelected(setupName: string): void {
    this.dialog
      .open(DeleteConfirmPopupComponent, {
        panelClass: ['noDialogPadding', 'rfPanel'],
        data: { setupName }
      })
      .afterClosed()
      .subscribe((confirmed: boolean) => {
        if (confirmed) {
          this.store.dispatch(GarageActions.deleteSelectedSetup());
        }
      });
  }

  compare(): void {
    this.store.dispatch(GarageActions.compareSelected());
    this.dialogRef.close();
  }

  setDefaultSetup(): void {
    this.store.dispatch(GarageActions.setDefaultSelected());
    this.dialogRef.close();
  }

  loadFactoryDefault(): void {
    this.store.dispatch(GarageActions.factoryDefault());
    this.dialogRef.close();
  }

  openCopyPopup(setupFolders: Setup[], setupName: string): void {
    this.dialog
      .open(CopySetupPopupComponent, {
        panelClass: ['noDialogPadding', 'rfPanel'],
        height: '70vh',
        maxHeight: '70vh',
        width: '40vw',
        data: { setupFolders, setupName }
      })
      .afterClosed()
      .subscribe((result: { selectedFolder: Setup; setupName: string }) => {
        if (!result) return;
        this.store.dispatch(
          GarageActions.copySetup({ dest: `${result.selectedFolder.name}${result.setupName}`, src: setupName })
        );
      });
  }
}
