import { Component, OnInit } from '@angular/core';
import { SocialAuthService} from "angularx-social-login";
import { FacebookLoginProvider, GoogleLoginProvider } from "angularx-social-login";
import {BazaService} from '../baza.service'

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
  constructor(private authService: SocialAuthService,private baza: BazaService) {}

  ngOnInit() {
    this.authService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = (user != null);
      if(this.loggedIn){
        this.baza.sendUser(user.email,true);
      }
    });
  }
  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then((res) => {
   
    });
  }
 
  signInWithFB(): void {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID).then((res) => {
   
    });;
  }

  signOut(): void {
    this.authService.signOut(true);
    sessionStorage.clear();
    this.loggedIn = false;
    this.baza.sendUser("no user",false);
    this.user.name = "";
    this.user.email = "";
  }
}
