import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, timer } from 'rxjs';
import { filter, map, switchMap } from 'rxjs/operators';
import { SessionInfo } from '../../interfaces/session-info';
import { GamePhase } from '../../interfaces/game-phase';

@Component({
  selector: 'rf-race-countdown-timer',
  templateUrl: './race-countdown-timer.component.html',
  styleUrls: ['./race-countdown-timer.component.scss']
})
export class RaceCountdownTimerComponent implements OnInit {
  public timeLeft$: Observable<number>;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.timeLeft$ = timer(1, 1000).pipe(
      switchMap(() => this.http.get<SessionInfo>('/rest/watch/sessionInfo')),
      filter(
        (info: SessionInfo) =>
          info.session.startsWith('RACE') && // race session
          info.gamePhase === GamePhase.BEFORE && // before formation lap start
          info.maximumLaps < 1500
      ), // lap limited race
      map((info: SessionInfo) => Math.round(info.endEventTime - info.currentEventTime))
    );
  }
}
