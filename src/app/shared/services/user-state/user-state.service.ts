import { Injectable } from '@angular/core';
import { IUser } from '../../interfaces/user.interface';
import { WebstorageService } from '../webstorage/webstorage.service';

@Injectable({
  providedIn: 'root'
})
export class UserStateService {

  constructor(private localStoarge: WebstorageService) { }

  setUserToken(user: IUser) {
    this.localStoarge.setLocalstorageItem({ key: 'user', value: JSON.stringify(user) });
  }

  getUserToken(): IUser {
    const user = this.localStoarge.getLocalstorageItem('user');
    return JSON.parse(user.value);
  }
}
