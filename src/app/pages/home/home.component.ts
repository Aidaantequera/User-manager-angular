import { Component, inject } from '@angular/core';
import { IUsers } from '../../interfaces/iusers';
import { UsersService } from '../../services/users.service';
import { IResponse } from '../../interfaces/iresponse';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  arrUsers: IUsers[] = [];
  usersService = inject(UsersService);

  constructor() {
    this.loadUsers();
  }

  async loadUsers() {
    try {
      const response: IResponse = await this.usersService.getAll(); // Usa la interfaz IResponse
      this.arrUsers = response.results;
      console.log('promesa', response);
    } catch (error) {
      console.error('Error al obtener usuarios:', error);
    }
  }
}