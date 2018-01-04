import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  
  userName;
  email;

  constructor(private usersService: UsersService) { }

  ngOnInit() {
    this.usersService.getProfile()
    .subscribe(data => {
      console.log(data);
      this.userName = data.user.name,
      this.email = data.user.email
    })
  }

  logout() {
    this.usersService.logout();
  }

}
