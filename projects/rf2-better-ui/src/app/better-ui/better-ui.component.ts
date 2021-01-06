import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'rf-better-ui',
  template: '',
  styleUrls: ['./better-ui.component.scss']
})
export class BetterUiComponent implements OnInit {

  constructor() {
    console.log("Better UI loaded");

    const div: HTMLDivElement = document.createElement("div");
    div.innerHTML = `<span style="position: absolute; bottom: 0; right: 0; z-index: 1; font-size: 10px">Better-UI v2.0</span>`;
    document.getElementsByTagName("body")[0].prepend(div);
  }

  ngOnInit(): void {
  }

}
