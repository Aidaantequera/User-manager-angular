import { Component, inject } from '@angular/core';
import { IUsers } from '../../interfaces/iusers';
import { UsersService } from '../../services/users.service';
import { IResponse } from '../../interfaces/iresponse';
import { RouterLink } from '@angular/router';
import { toast } from 'ngx-sonner';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  imports: [RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  arrUsers: IUsers[] = [];
  currentPage: number = 1; // 🔹 Página actual
  totalPages: number = 1;  // 🔹 Total de páginas
  usersService = inject(UsersService);

  constructor() {
    this.loadUsers(this.currentPage); // 🔹 Cargar primera página al iniciar
  }

  async loadUsers(page: number) {
    try {
      const response: IResponse = await this.usersService.getAll(page);
      this.arrUsers = response.results; // 🔹 Los usuarios de la página actual
      this.currentPage = response.page;
      this.totalPages = response.total_pages;
      console.log(`Usuarios cargados en página ${this.currentPage}:`, response);
    } catch (error) {
      console.error('Error al obtener usuarios:', error);
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.loadUsers(this.currentPage);
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadUsers(this.currentPage);
    }
  }

  async deleteUser(id: string) {
    if (!id) {
      Swal.fire("Error", "ID de usuario inválido.", "error");
      return;
    }

    const result = await Swal.fire({
      title: "¿Estás seguro?",
      text: "Esta acción no se puede deshacer.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
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
      } else {
        Swal.fire("Error", response.error || "No se pudo eliminar el usuario.", "error");
      }
    } catch (error) {
      Swal.fire("Error", "Error al eliminar el usuario.", "error");
    }
  }
}
