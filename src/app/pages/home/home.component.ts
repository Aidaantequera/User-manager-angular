import { Component, inject } from '@angular/core';
import { IUsers } from '../../interfaces/iusers';
import { UsersService } from '../../services/users.service';
import { IResponse } from '../../interfaces/iresponse';
import { RouterLink } from '@angular/router';
import { toast } from 'ngx-sonner';
import Swal from 'sweetalert2'; // 🔹 Importamos SweetAlert2

@Component({
  selector: 'app-home',
  imports: [RouterLink],
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
      const response: IResponse = await this.usersService.getAll();
      this.arrUsers = response.results;
      console.log('promesa', response);
    } catch (error) {
      console.error('Error al obtener usuarios:', error);
    }
  }
  
  verDetalle(){

  }
  async deleteUser(id: string) {
    console.log("Intentando eliminar usuario con ID:", id); // 🔹 Verifica el ID en la consola
  
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
      console.log("Respuesta de la API al eliminar:", response); // 🔹 Verifica la respuesta de la API
  
      if (response._id) { // La API devuelve el usuario en lugar de eliminarlo
        Swal.fire("Usuario Eliminado", "El usuario ha sido eliminado correctamente.", "success");
  
        // 🔹 Ocultar el usuario manualmente en la lista
        this.arrUsers = this.arrUsers.filter(user => user._id !== id);
      } else {
        Swal.fire("Error", response.error || "No se pudo eliminar el usuario.", "error");
      }
    } catch (error) {
      Swal.fire("Error", "Error al eliminar el usuario.", "error");
    }
  }
  
}
