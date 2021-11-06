import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, Inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Setup } from '../../interfaces/setup';

@Component({
  selector: 'rf-copy-setup-popup',
  templateUrl: './copy-setup-popup.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CopySetupPopupComponent implements AfterViewInit {
  @ViewChild('setupList')
  private setupList: ElementRef<HTMLDivElement>;

  public selectedFolder: Setup;
  public setupName: string;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { setupFolders: Setup[]; setupName: string },
    private dialog: MatDialogRef<CopySetupPopupComponent>
  ) {
    const copySetupFolder: string = this.data.setupName.split('\\')[0];
    this.setupName = this.data.setupName.split('\\')[1];
    this.selectedFolder = this.data.setupFolders.find((s: Setup) => s.name.startsWith(copySetupFolder));
  }

  ngAfterViewInit(): void {
    this.setupList.nativeElement.querySelector('#selected').scrollIntoView({ block: 'center' });
  }

  cancel(): void {
    this.dialog.close();
  }

  copy(): void {
    this.dialog.close({ selectedFolder: this.selectedFolder, setupName: this.setupName });
  }
}
