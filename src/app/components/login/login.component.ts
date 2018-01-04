import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Observable } from 'rxjs/Observable'
import { setTimeout } from 'timers';
import { CanActivate, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  errors: Observable<any>;

  constructor(private usersService: UsersService,
    private flashMsg: FlashMessagesService,
    private router: Router,) { }

  ngOnInit() {

  }
  
  login(email, password) {
    const user = {
      email: email,
      password: password
    }
    this.usersService.login(user)
    .subscribe(data => {
      if(!data.success) {
        console.log('error - login.ts ')
      } else {
        console.log('success - login.ts')
        this.usersService.storeUserData(data.token, data.user);
        setTimeout(() => {
          this.router.navigate([''])
        }, 2000)
      }
    })
  }

  register(email, password, password2, username) {

    if (password != password2) {
      this.flashMsg.show('Passwords Do not match!', { cssClass: 'alert-danger', timeout: 3500 });
    }
    else if (email && password && username) {
      this.usersService.register(email, password, username)
        .subscribe(res => {
          if (res == false) {
            this.flashMsg.show('Email in use', { cssClass: 'alert-danger', timeout: 3500 });
          }
          else {
            this.flashMsg.show('User Created :)', { cssClass: 'alert-success', timeout: 3500 });
          }
        })
    } else {
      this.flashMsg.show('Please complete all fields', { cssClass: 'alert-danger', timeout: 3500 });
    }
  }

}
