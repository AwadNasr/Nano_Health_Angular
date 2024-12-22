import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  currentUser=new BehaviorSubject(null)
  userName:any=localStorage.getItem('userName')
  constructor(private _HttpClient:HttpClient,private _Router:Router) {
    if(localStorage.getItem('userToken') !==null){
      this.decode()
    }
  }
  register(userData:any):Observable<any>
  {
   return this._HttpClient.post('https://localhost:7009/api/Auth/register', userData)
  }
  login(userData:any):Observable<any>
  {
   return this._HttpClient.post('https://localhost:7009/api/Auth/login', userData)
  }
  decode(){
    let encode=JSON.stringify(localStorage.getItem('userToken'))
    let decoded:any=jwtDecode(encode)
    this.currentUser.next(decoded)
  }
}
