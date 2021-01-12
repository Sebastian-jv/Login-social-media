import { Injectable,EventEmitter,Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { User } from './dane/dane.component';
import { BehaviorSubject } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class BazaService {
  host = 'https://imsi.pl:5000/';
  userName = "no user";

  private messageSource = new BehaviorSubject<boolean>(false);
  currentMessage = this.messageSource.asObservable();
  
  changeMessage(message: boolean) {
    this.messageSource.next(message);
  }

  setName(str:string){
    this.userName = str;
  }

  sendUser(newUser:string, status:boolean){
    this.userName = newUser;
    this.changeMessage(status);  
  }
 
  constructor(private http: HttpClient) { }

  addUser(name:String): Observable<User> {
    return this.http.put<User>(this.host + 'players', {  name: name });
}
  
  getUser(username:string ): Observable<User> {
    return this.http.get<User>( this.host + "player/" + username );
}
  putUser(user:User): Observable<User> {
    return this.http.put<User>( this.host + "players/" + user.id , user);
  }

 
}
