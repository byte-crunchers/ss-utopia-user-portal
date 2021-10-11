import { User } from './passwordrecovery.model';
import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PasswordService {

  getUser (): Observable<User[]>{
    return of([
    {username: 'dantheman',
    email: 'dan@gmail.com',
    zipcode: 12345}
    ]);
  };
}
