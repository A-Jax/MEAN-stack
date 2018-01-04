import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router'; // include routing 
import { BlogService } from './services/blog.service';
import { AppComponent } from './app.component';
import { IndexComponent } from './components/index/index.component';
import { LoginComponent } from './components/login/login.component';
import { UsersService } from './services/users.service';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http'
import { FlashMessagesModule } from 'angular2-flash-messages';
import { ProfileComponent} from './components/profile/profile.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AboutComponent } from './components/about/about.component';
//import { HttpClient } from '@angular/http/common'
//import { AuthGaurd } from '../app/gaurds/auth.guard'
import { AuthGuard } from './gaurds/auth.guard';


const appRoutes: Routes = [
  {path: 'index', canActivate: [ AuthGuard ], component: IndexComponent},
  {path: 'register', component: LoginComponent},
  {path:'profile',  component: ProfileComponent},
  {path:'about', component: AboutComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    LoginComponent,
    ProfileComponent,
    NavbarComponent,
    AboutComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    FlashMessagesModule.forRoot(),
    HttpModule
  ],
  providers: [
    BlogService,
    UsersService,
    AuthGuard

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
