import { User } from './profile.model';
import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {

  getUser (): Observable<User[]>{
    return of([
    {username: 'dan',
    email: 'dan@gmail.com',
    firstName: 'Dan',
    lastName: 'McDan',
    phone: '(605)555-5555',
    street: '1234 First Street',
    city: 'Fairview',
    state: 'SD',
    zipcode: 57027}
    ]);
  };
}
