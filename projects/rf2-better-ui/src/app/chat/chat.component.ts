import { Component, ElementRef, HostBinding, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, timer } from 'rxjs';
import { distinctUntilChanged, switchMap, tap } from 'rxjs/operators';

interface ChatMessage {
  message: string;
  timestamp: number;
}

@Component({
  selector: 'rf-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, OnDestroy {

  @HostBinding('style.height.px')
  height: number = undefined;

  @HostBinding('style.opacity')
  opacity: number = 0;

  @ViewChild('chatList')
  private chatListElement: ElementRef;

  messages$: Observable<ChatMessage[]>;

  private destroy$: Subject<boolean> = new Subject<boolean>();

  private scrollOnNext: boolean = true;

  constructor(private http: HttpClient) {
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.calculateHeight();

      this.messages$ = timer(1, 1000).pipe(
        switchMap(() => this.http.get<ChatMessage[]>('/rest/chat')),
        distinctUntilChanged((prev: ChatMessage[], curr: ChatMessage[]) => prev.length === curr.length),
        tap(() => {
          if (this.scrollOnNext) {
            this.scrollToBottom();
            this.scrollOnNext = false;
          }
        })
      );

      this.opacity = 1;
    }, 1000);
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  sendMessage(msg: string): void {
    this.http.post('/rest/chat', msg).subscribe(() => {
      this.scrollOnNext = true;
    });
  }

  private scrollToBottom(): void {
    setTimeout(() => {
      try {
        this.chatListElement.nativeElement.scrollTop = this.chatListElement.nativeElement.scrollHeight;
      } catch (err) {
      }
    }, 0);
  }

  public calculateHeight(): void {
    const cameraControls: Element = document.getElementsByClassName('camera-controls')[0];
    const cameraBottom: number = cameraControls?.getBoundingClientRect().bottom;

    const buttonNav: Element = document.getElementsByClassName('buttonnavigation')[0];
    const buttonNavTop: number = buttonNav?.getBoundingClientRect().top;

    this.height = buttonNavTop - cameraBottom;
  }

  private waitForElement(selector: string): Promise<Element> {
    return new Promise(resolve => {
      if (document.querySelector(selector)) {
        return resolve(document.querySelector(selector));
      }

      const observer = new MutationObserver(mutations => {
        if (document.querySelector(selector)) {
          resolve(document.querySelector(selector));
          observer.disconnect();
        }
      });

      observer.observe(document.body, {
        childList: true,
        subtree: true
      });
    });
  }
}
