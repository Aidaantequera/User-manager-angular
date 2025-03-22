import { Component, Input, inject } from '@angular/core';
import { IUsers } from '../../interfaces/iusers';
import { UsersService } from '../../services/users.service';
import { toast } from 'ngx-sonner';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-user-view',
  imports: [RouterLink],
  templateUrl: './user-view.component.html',
  styleUrl: './user-view.component.css'
})
export class UserViewComponent {
  @Input() idUser: string = ""; // Recibe el ID como input
  theUser!: IUsers | any; // Datos del usuario
  usersService = inject(UsersService); // Inyección del servicio
  

async ngOnInit() {
  console.log (this.idUser)

  try{
     this.theUser = await this.usersService.getById(this.idUser)
     console.log(this.theUser)
    
  }catch(error){
    console.log(error)
  }
 
    
}

  eliminarUsuario(){

  }


  actualizarUsuario(){

  }


  volverAlListado(){

  }

}


