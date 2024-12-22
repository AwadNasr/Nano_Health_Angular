import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  isLogin:boolean=false

  constructor(private _AuthService:AuthService ,private _Router:Router) {
  }
  userName:any=''
  ngOnInit(): void {
    this._AuthService.currentUser.subscribe({
      next:()=>{
        if(this._AuthService.currentUser.getValue() != null){
          this.isLogin=true
        }else{
          this.isLogin=false
        }
      }
    })
  }
  logout(){
    localStorage.removeItem('userToken')
    localStorage.removeItem('userName')
    this._AuthService.currentUser.next(null)
    this._Router.navigate(['/login'])
  }
}
