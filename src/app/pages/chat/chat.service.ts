import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, map, Observable } from 'rxjs';
import { io, Socket } from 'socket.io-client';

export interface Message {
  user: string;
  content: string;
}

export interface ChatRoom {
  users: string[];
  messages: Message[];
}

export interface ChatAppData {
  activeRoom: string;
  chatRoom: ChatRoom;
  connected: boolean;
  rooms: string[];
  user: string;
}

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private client!: Socket;
  private connected$ = new BehaviorSubject(false);
  private user$ = new BehaviorSubject('Ngx-Wesley');
  private rooms$ = new BehaviorSubject<string[]>([]);
  private activeRoom$ = new BehaviorSubject('General');
  private chatRoom$ = new BehaviorSubject<ChatRoom>({
    users: [],
    messages: [],
  });

  constructor() { 
    this.client = io('/chat', { autoConnect: true, path: '/api/socket.io' });
    this.client.on('connect', () => this.connected());
  }

  getChatAppData(): Observable<ChatAppData> {
    const data = combineLatest([
      this.activeRoom$,
      this.chatRoom$,
      this.connected$,
      this.rooms$,
      this.user$,
    ]).pipe(
      map((value) => {
        const [activeRoom, chatRoom, connected, rooms, user] = value;
        return {
          activeRoom,
          chatRoom,
          connected,
          rooms,
          user,
        };
      })
    );
    return data;
  }

  private connected(): void {
    this.client.emit('identify', this.user$.value, (rooms: string[]) => this.rooms$.next(rooms));
    this.joinRoom(this.activeRoom$.value);
    this.connected$.next(true);
  }

  private joinRoom(room: string) {
    const payload = { user: this.user$.value, room };
    this.client.emit('joinRoom', payload, (chatRoom: ChatRoom) => this.chatRoom$.next(chatRoom));
  }
}
