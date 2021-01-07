import { Component, OnInit } from '@angular/core';
import { combineLatest } from 'rxjs';
import { BazaService } from '../baza.service';


@Component({
  selector: 'app-dane',
  templateUrl: './dane.component.html',
  styleUrls: ['./dane.component.css'],
})
export class DaneComponent implements OnInit {
  constructor(private baza: BazaService) { }

  username = 'nazwaa';
  newUser =false;
  user: User = {
    id: 0,
    p0: '',
    p1: '',
    p2: '',
    p3: '',
    p4: '',
    p5: '',
    p6: '',
    p7: '',
    p8: '',
    p9: '',
    name: this.username,
};
  ngOnInit(): void {
  }

  getData(userN:string): void {
    this.username= "inny";
    this.username = userN;
    console.log("Wywolujacy LOG2.5: " + this.username);
    this.baza.getUser(this.username).subscribe((t_user:any) => {
      console.log("Wywolujacy LOG3: " + this.username);
        if (Object.keys(t_user).length == 0) {
            console.log('No user found!');
            this.newUser =true;
            this.addUser();
            return;
        }

        this.user = t_user[0];
        this.user.name = this.username;
        console.log(
          "Wywolujacy LOG4: " + this.user.name);
        if(this.newUser){
          this.user.p0 = '0';
          this.newUser = false;
        } 
        else{
           var x =parseInt(this.user.p0);
           x+=1;
           this.user.p0 = x.toString();
        }
        console.log("Wywolujacy LOG5: " + this.user.name);
        console.log("Wywolujacy LOG6: " + this.username);
       
    });
}
addUser(): void {
  this.baza.addUser(this.username).subscribe(() => {
      console.log('User added');
      this.getData(this.username);
  });
}
}

export interface User {
  id: number;
  p0: string;
  p1: string;
  p2: string;
  p3: string;
  p4: string;
  p5: string;
  p6: string;
  p7: string;
  p8: string;
  p9: string;
  name: string;
}
