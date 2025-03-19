import { Component, Inject, OnInit } from '@angular/core';
import { IUsers } from '../../interfaces/iusers';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
  arrUsersPromises: IUsers[] = [];
  UsersService = Inject(UsersService);

  async ngOnInit() {
    
    try {
      this.arrUsersPromises = await this.UsersService.getAll();
      console.log('promesa', this.arrUsersPromises);
    } catch (error) {
      console.error('Error al obtener usuarios:', error);
    }
  }
}
  


