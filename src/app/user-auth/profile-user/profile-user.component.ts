import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from '../../service/users.service';

@Component({
  selector: 'app-profile-user',
  templateUrl: './profile-user.component.html',
  styleUrl: './profile-user.component.css'
})
export class ProfileUserComponent implements OnInit {

  constructor(private readonly userService:UsersService,
    private readonly router: Router){}


    profileInfo: any;
    errorMessage: string = ''

  async ngOnInit() {
    try {
      const token = localStorage.getItem('token')
      if(!token){
        throw new Error("No Token Found")
      }

      this.profileInfo = await this.userService.getYourProfile(token);
    } catch (error:any) {
      this.showError(error.message)
    }
      
  }


  showError(mess: string) {
    this.errorMessage = mess;
    setTimeout(() => {
      this.errorMessage = ''
    }, 3000)
  }
}
