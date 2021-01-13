import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {SocialLoginModule,SocialAuthServiceConfig,} from 'angularx-social-login';
import {GoogleLoginProvider,FacebookLoginProvider,} from 'angularx-social-login';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { DaneComponent } from './dane/dane.component';
import { HttpClientModule } from '@angular/common/http';


//Put your ID here
//This ID is exemplery from  https://www.npmjs.com/package/angularx-social-login

 const MY_GOOGLE_ID = "624796833023-clhjgupm0pu6vgga7k5i5bsfp6qp6egh.apps.googleusercontent.com";
 const MY_FB_ID ='561602290896109';

@NgModule({
  declarations: [AppComponent,LoginComponent, DaneComponent],
  imports: [
    BrowserModule, 
    SocialLoginModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(MY_GOOGLE_ID),
          },
          {
            id: FacebookLoginProvider.PROVIDER_ID,
            provider: new FacebookLoginProvider(MY_FB_ID),
          },
        ],
      } as SocialAuthServiceConfig,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
