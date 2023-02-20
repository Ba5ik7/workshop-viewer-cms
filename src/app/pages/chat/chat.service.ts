import { Injectable } from '@angular/core';
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

  constructor() { 
    this.client = io('', { autoConnect: true, path: '/api/chat' });
    this.client.on('connect', () => {
      console.warn('Connected to server');
    });
  }
}
