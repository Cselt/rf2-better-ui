import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'rf-delete-confirm-popup',
  templateUrl: './delete-confirm-popup.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DeleteConfirmPopupComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data: { setupName: string }) {
  }

}
