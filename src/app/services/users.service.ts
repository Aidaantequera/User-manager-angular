import { inject, Injectable } from '@angular/core';
import { IUsers } from '../interfaces/iusers';
import { lastValueFrom } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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
  return lastValueFrom(this.httpClient.get<IUsers>(`${this.endPoint}/${id}`))
};

  // Insertar usuario (crear nuevo)
  insert(user: IUsers): Promise<IUsers> {
    return lastValueFrom(this.httpClient.post<IUsers>(this.endPoint, user));
  }

  // Actualizar usuario
  update(user: IUsers): Promise<IUsers> {
    return lastValueFrom(this.httpClient.put<IUsers>(`${this.endPoint}/${user._id}`, user));
  }
  
 
    
  
}
