import { inject, Injectable } from '@angular/core';
import { IUsers } from '../interfaces/iusers';
import { lastValueFrom } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { IResponse } from '../interfaces/iresponse';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private endPoint: string = "https://peticiones.online/api/users";
  private httpClient = inject(HttpClient);

  getAll(): Promise<IResponse> {
    return lastValueFrom(this.httpClient.get<IResponse>(this.endPoint));
  }

  getById(id: string): Promise<IUsers> {
    console.log('ID pasado a getById:', id);
    return lastValueFrom(this.httpClient.get<IUsers>(`${this.endPoint}/${id}`));
  }

  insert(user: IUsers): Promise<IUsers> {
    return lastValueFrom(this.httpClient.post<IUsers>(this.endPoint, user));
  }

  update(user: IUsers): Promise<IUsers> {
    return lastValueFrom(this.httpClient.put<IUsers>(`${this.endPoint}/${user._id}`, user));
  }

  async deleteUser(_id: string): Promise<any> {
    return lastValueFrom(this.httpClient.delete<any>(`https://peticiones.online/api/users/${_id}`));
  }
  
}