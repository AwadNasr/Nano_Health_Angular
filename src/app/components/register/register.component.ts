import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  constructor(private _AuthService:AuthService, private _Router:Router,private toastr: ToastrService){}
  isLoading:boolean=false

  registerForm:FormGroup=new FormGroup({
    FName:new FormControl('',[Validators.required]),
    LName:new FormControl('',[Validators.required]),
    Email:new FormControl('',[Validators.required,Validators.email]),
    Password:new FormControl('',[Validators.required,Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/)]),
  })
  handleRegister(registerForm:FormGroup){
    if(registerForm.valid){
      console.log(registerForm.value);
      this.isLoading=true
      this._AuthService.register(registerForm.value).subscribe({
        next:(response) =>{
          this.isLoading=false
          console.log(response);

          if(response.message=='Registration successful'){
            this.toastr.success('You registerd successfully', 'Success',{
              timeOut: 2000,
            });
            this._Router.navigate(['/login'])
          }
        },
        error:(err) =>{
          this.isLoading=false
          this.toastr.warning(err.error.message, 'Ooops',{
            timeOut: 1500,
          });
        }
      })
    }
  }
}
