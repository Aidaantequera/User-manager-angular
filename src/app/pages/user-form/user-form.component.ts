import { Component, Input, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { IUsers } from '../../interfaces/iusers';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-user-form',
  imports: [ReactiveFormsModule],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.css'
})
export class UserFormComponent {
  @Input() idUser: string = "";
  UserForm!: FormGroup;
  usersService = inject(UsersService); 
  user!: IUsers; 
  title: string = "Guardar";

  async ngOnInit() {
    if (this.idUser) {
      try {
        this.user = await this.usersService.getById(this.idUser);
        this.title = 'Actualizar'
        
      } catch (error) {
        console.error("Error al obtener usuario:", error);
      }
    } else {
      this.user = {} as IUsers; // Evitamos errores si no hay ID
    }

    
    this.UserForm = new FormGroup({
      _id: new FormControl(this.user._id || ""),
      first_name: new FormControl(this.user.first_name || ""),
      last_name: new FormControl(this.user.last_name || ""),
      username: new FormControl(this.user.username || ""),
      email: new FormControl(this.user.email || ""),
      image: new FormControl(this.user.image || ""),
    });
  }

  getDataForm() {
    console.log("Formulario enviado:", this.UserForm.value);
  }
}
