import { Component, Input, inject } from '@angular/core';
import { IUsers } from '../../interfaces/iusers';
import { UsersService } from '../../services/users.service';
import { toast } from 'ngx-sonner';
import { Router, RouterLink } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-view',
  imports: [RouterLink],
  templateUrl: './user-view.component.html',
  styleUrl: './user-view.component.css'
})
export class UserViewComponent {
  @Input() idUser: string = ""; 
  theUser!: IUsers | any; 
  usersService = inject(UsersService); 
  arrUsers: IUsers[] = [];
  router = inject(Router);

  async ngOnInit() {
    console.log(this.idUser);

    try {
      this.theUser = await this.usersService.getById(this.idUser);
      console.log(this.theUser);
    } catch (error) {
      console.log(error);
    }
  }

  async deleteUser(id: string) {
      console.log("Intentando eliminar usuario con ID:", id); 
    
      if (!id) {
        Swal.fire("Error", "ID de usuario inválido.", "error");
        return;
      }
    
      const result = await Swal.fire({
        title: "¿Estás seguro?",
        text: "Esta acción no se puede deshacer.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#9460fc",
        cancelButtonColor: "#9460fc",
        confirmButtonText: "Sí, eliminar",
        cancelButtonText: "Cancelar"
      });
    
      if (!result.isConfirmed) return;
    
      try {
        const response = await this.usersService.deleteUser(id);
        console.log("Respuesta de la API al eliminar:", response); 
    
        if (response._id) { 
          Swal.fire("Usuario Eliminado", "El usuario ha sido eliminado correctamente.", "success");
    
         
          this.arrUsers = this.arrUsers.filter(user => user._id !== id);
          setTimeout(() => {
            this.router.navigate(['/home']);
          }, 2000);
        } else {
          Swal.fire("Error", response.error || "No se pudo eliminar el usuario.", "error");
        }
      } catch (error) {
        Swal.fire("Error", "Error al eliminar el usuario.", "error");
      }
    }

  actualizarUsuario() {
  
  }

  volverAlListado() {
    this.router.navigate(['/home']); 
  }
}