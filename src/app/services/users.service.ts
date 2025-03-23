import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
import { IResponse } from '../interfaces/iresponse';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private endPoint = 'https://peticiones.online/api/users';
  private http = inject(HttpClient);


  async getAll(page: number = 1): Promise<IResponse> {
    return lastValueFrom(this.http.get<IResponse>(`${this.endPoint}?page=${page}`));
  }


  async getById(id: string): Promise<any> {
    return lastValueFrom(this.http.get<any>(`${this.endPoint}/${id}`));
  }


  async insert(userData: any): Promise<any> {
    return lastValueFrom(this.http.post<any>(this.endPoint, userData));
  }


  async update(id: string, userData: any): Promise<any> {
    return lastValueFrom(this.http.put<any>(`https://peticiones.online/api/users/${id}`, userData));
  }
  


  async deleteUser(id: string): Promise<any> {
    return lastValueFrom(this.http.delete<any>(`${this.endPoint}/${id}`));
  }
}
