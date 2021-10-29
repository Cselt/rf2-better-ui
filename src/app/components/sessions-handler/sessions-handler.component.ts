import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

interface OpponentFilter {
  state: 'OP_NOTHING' | 'OP_OR';
  stringValue: string;
  gVehFilterIndex: number;
  gSelectedListIndex: number;
}

@Component({
  selector: 'rf-sessions-handler',
  template: '',
  styleUrls: ['./sessions-handler.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SessionsHandlerComponent implements OnInit {

  private rightSection: HTMLElement;

  constructor(private http: HttpClient) {
  }

  ngOnInit(): void {
    // if the selected thumbnail is the opponents already
    if (location.hash === '#/opponents') {
      this.findSelectButtons();
      this.loadCurrentFilter();
    }

    // find opponents thumbnail
    (document.querySelectorAll('main section div.thumbnail').item(1) as HTMLDivElement).addEventListener('click', () => {
      this.findSelectButtons();
      this.loadCurrentFilter();
    });
  }

  private findSelectButtons(): void {
    this.rightSection = document.querySelector('section right-section');
    this.rightSection.querySelectorAll('button').forEach((node: HTMLButtonElement) =>
      node.addEventListener('click', () => this.loadCurrentFilter()));
  }

  private loadCurrentFilter(): void {
    this.http.get('/rest/sessions/opponents/filter').pipe(
      map((filters: OpponentFilter[]) => filters.filter((f: OpponentFilter) => !!f))
    ).subscribe((filters: OpponentFilter[]) => {
      filters.forEach((filter: OpponentFilter) => {
        setTimeout(() => {
          this.rightSection.querySelectorAll(`div.opponent-filter ul li`).forEach((li: HTMLLIElement) => {
            if (filter.state === 'OP_OR' && li.innerText === filter.stringValue) {
              li.classList.add('selected');
            }

            li.onclick = () => {
              setTimeout(() => {
                this.loadCurrentFilter();
              }, 200);
            };
          });
        }, 0);
      });
    });
  }
}
