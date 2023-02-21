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
  private user$ = new BehaviorSubject('');
  private rooms$ = new BehaviorSubject<string[]>([]);
  private activeRoom$ = new BehaviorSubject('General');
  private chatRoom$ = new BehaviorSubject<ChatRoom>({
    users: [],
    messages: [],
  });

  constructor() { 
    this.client = io('', { autoConnect: false, path: '/api/chat' });
    this.client.on('connect', () => console.warn('Connected to server'));
  }

  connect(user: string) {
    if (this.client.connected) return
    this.client.connect();
  }
}
