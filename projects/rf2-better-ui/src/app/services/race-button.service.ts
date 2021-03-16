import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { waitForElement } from '../utils/utils';

@Injectable({
  providedIn: 'root'
})
export class RaceButtonService {

  constructor(private http: HttpClient) {
  }

  public async addRaceButton(): Promise<void> {
    const quitLi: HTMLLIElement = (await waitForElement('nav ol.right li.fa-power-off', 1000) as HTMLLIElement);
    const ol: HTMLElement = quitLi.parentElement;
    if (ol) {
      const raceButton: HTMLButtonElement = document.createElement('button');
      raceButton.classList.add('raceButton', 'fa', 'fa-play', 'fi-white');
      raceButton.addEventListener('click', () => this.drive());
      ol.appendChild(raceButton);
    }
  }

  private drive(): void {
    this.http.post('/rest/garage/drive', undefined).subscribe();
  }
}
