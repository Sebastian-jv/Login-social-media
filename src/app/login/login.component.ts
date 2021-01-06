import { Component, OnInit } from '@angular/core';
import { SocialAuthService, SocialUser } from "angularx-social-login";
import { FacebookLoginProvider, GoogleLoginProvider } from "angularx-social-login";
import {CommunicationService} from "../communication.service"

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  title = 'angular-social-login';
  user: any;
  loggedIn = false;
  users: any = {};
  constructor(private authService: SocialAuthService,private communication: CommunicationService,) {}

  ngOnInit() {
    this.authService.authState.subscribe((user) => {
      console.log("Pierwszy LOG: " + user);
      this.user = user;
      this.loggedIn = (user != null);
      if(this.loggedIn){
        console.log("Wywolujacy LOG: " + user.email);
        this.communication.checkUser(user.email);
      }
    });
  }
  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then((res) => {
   
    });
  }
  // signInWithGoogle(): void {
  //   this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then((res) => {
  //     if (this.users && this.users[res.email]) {
  //       this.users[res.email].count += 1;
  //     } else {
  //       this.users[res.email] = {
  //         count: 1,
  //       };
  //     }
  //   });
  // }

  signInWithFB(): void {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
  }

  signOut(): void {
    this.authService.signOut();
  }
}
