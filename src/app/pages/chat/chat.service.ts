import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
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
  private user$ = new BehaviorSubject('Admin');
  private rooms$ = new BehaviorSubject<string[]>([]);
  private activeRoom$ = new BehaviorSubject('General');
  private chatRoom$ = new BehaviorSubject<ChatRoom>({
    users: [],
    messages: [],
  });

  constructor() { 
    this.client = io('', { autoConnect: true, path: '/api/chat' });
    this.client.on('connect', () => this.connected());
  }

  connect(user: string) {
    if (this.client.connected) return
    this.client.connect();
  }

  // I know it's a void return function :()
  private connected(): void {
    this.client.emit('identify', this.user$.value, (rooms: string[]) => {
      this.rooms$.next(rooms);
    });
    this.connected$.next(true);
  }
}
