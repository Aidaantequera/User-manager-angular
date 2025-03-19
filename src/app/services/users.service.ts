import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable,inject, } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { IUsers } from '../interfaces/iusers';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  
  private endPoint: string = "https://peticiones.online/api/users";
  private httpClient= inject(HttpClient)

  getAll(): Promise<IUsers[]> {
    return lastValueFrom(this.httpClient.get<IUsers[]>(this.endPoint, this.getAuthorization()));
  }

  getById(id: string): Promise<IUsers> {
    return lastValueFrom(this.httpClient.get<IUsers>(`${this.endPoint}/${id}`, this.getAuthorization()));
  }

  private getAuthorization() {
    return {
      headers: new HttpHeaders({
        'Content-type': 'application/json',
        'Authorization': localStorage.getItem('token') || ""
      })
    };
  }
}

