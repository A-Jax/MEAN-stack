import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users.service'
import { CanActivate, Router } from '@angular/router';
import { setTimeout } from 'timers';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private usersService: UsersService,
  private router: Router,
  private flashMsg: FlashMessagesService) { }

    isLoggedin: boolean;

  ngOnInit() {
    this.usersService.getProfile()
    .subscribe(data => {
      if(!data.user.email) {
        this.isLoggedin = false;
      } else {
        this.isLoggedin = true;
      }
    })
  }

  

  login(email, password) {
    const user = {
      email: email,
      password: password
    }
    this.usersService.login(user)
    .subscribe(data => {
      if(!data.success) {
        this.flashMsg.show('Username or Password incorrect', { cssClass: 'alert-danger', timeout: 3500 })
        console.log('error - login.ts ')
        this.isLoggedin = false;
      } else {
        this.isLoggedin = true;
        console.log('success - login.ts')
        this.usersService.storeUserData(data.token, data.user);
        this.flashMsg.show('Signed in', { cssClass: 'alert-success', timeout: 3500 })
        // setTimeout(() => {
        //   this.router.navigate([''])
        // }, 2000)
      }
    })
  }

  logout() {
    this.isLoggedin = false;
    this.usersService.logout();
  }

}
