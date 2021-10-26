import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SettingsDialogComponent } from '../settings-dialog/settings-dialog.component';

@Component({
  selector: 'rf-settings-handler',
  templateUrl: './settings-handler.component.html',
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SettingsHandlerComponent implements OnInit, OnDestroy {

  constructor(private dialog: MatDialog) {
    console.log('Setting handler works');
  }

  ngOnInit(): void {
    window.addEventListener('hashchange', this.addSettingsButton.bind(this));

    this.addSettingsButton();
  }

  ngOnDestroy(): void {
    window.removeEventListener('hashchange', this.addSettingsButton);
  }

  private addSettingsButton(): void {
    if (!location.hash.startsWith('#/summary')) {
      return;
    }
    const leftSection: HTMLElement = document.querySelector('section.left');

    const settingsButton: HTMLButtonElement = document.createElement('button');
    settingsButton.classList.add('primary');
    settingsButton.onclick = () => {
      this.dialog.open(SettingsDialogComponent, {
        panelClass: ['noDialogPadding', 'rfPanel']
      });
    };
    settingsButton.innerHTML = `<span>Better-UI Settings</span>`;

    leftSection.appendChild(settingsButton);
  }

}
