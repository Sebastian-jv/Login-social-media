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
    newUser = false;
    userIn :boolean= false;
    answerSave = '';
    inUserName='';
    firstLog=false;
    
    ngOnInit(): void {
      this.baza.currentMessage.subscribe(msg => {
        this.userIn = msg;
        if(this.userIn){
          this.baza.userName = this.baza.userName;
          this.getData();
        }
      });
      }

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
      name: 'no user',
  };



    getData(): void {
      this.baza.getUser(this.baza.userName).subscribe((t_user:any) => {
          if (Object.keys(t_user).length == 0) {
              console.log('No user found!');
              this.newUser =true;
              this.firstLog = true;
              this.addUser();
              return;
          }

          this.user = t_user[0];

          if(this.newUser){
            this.user.p0 = '0';
            this.newUser = false;
          } 
          else{
            var x =parseInt(this.user.p0);
            x+=1;
            this.user.p0 = x.toString();
          }
          this.saveUser();
      });
  }
  addUser(): void {
    this.baza.addUser(this.baza.userName).subscribe(() => {
        console.log('User added');
        this.getData();
    });
  }

  saveUser( ): void {
    this.baza.putUser(this.user).subscribe( (change_user : any) => {
    console.log(change_user.err);
    if(change_user.err == 0)
        this.answerSave = "Correct save";
      else
      this.answerSave = "Incorrect save";
      console.log(this.answerSave);
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
  name:string;
}
