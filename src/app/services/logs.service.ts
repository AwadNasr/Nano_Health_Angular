import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LogsService {

  constructor(private _HttpClient:HttpClient) { }

  getLogs():Observable<any>
  {
    return this._HttpClient.get(`https://localhost:7009/api/LogEntry/get-all`)
  }
  register(Data:any):Observable<any>
  {
   return this._HttpClient.post('https://localhost:7009/api/LogEntry/add', Data)
  }
}
