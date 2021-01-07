import { Injectable } from '@angular/core';
import {DaneComponent} from './dane/dane.component'


@Injectable({
  providedIn: 'root'
})
export class CommunicationService {

   constructor(private dane: DaneComponent) { }
 
  checkUser(userName:string):void{
     this.dane.getData(userName);
     console.log("Wywolujacy LOG2: " + userName);
  }
}
