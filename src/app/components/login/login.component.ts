import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private _AuthService:AuthService, private _Router:Router,private toastr: ToastrService){}
  isLoading:boolean=false
  loginForm:FormGroup=new FormGroup({
    email:new FormControl(null,[Validators.required,Validators.email]),
    password:new FormControl(null,[Validators.required,Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/)]),
  })

  handleLogin(loginForm:FormGroup){
    if(loginForm.valid){
      this.isLoading=true
      this._AuthService.login(loginForm.value).subscribe({
        next:(response) =>{
          this.isLoading=false
          console.log(response);

          if(response.message==='success'){
            // navigate to Login , Save Token
            localStorage.setItem('userToken',response.token)
            console.log(response);
            this.toastr.success('You are logged in successfully', 'Hi ',{
              timeOut: 2000,
            });
            this._AuthService.decode()
            this._Router.navigate(['/logs'])
          }
        },
        error:(err) =>{
          this.isLoading=false
          console.log(err);
          this.toastr.warning(err.error.message, 'Ooops',{
            timeOut: 1500,
          });

        }
      })
    }

  }
}
