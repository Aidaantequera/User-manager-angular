import { Component, inject, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UsersService } from '../../services/users.service';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-form',
  imports: [ReactiveFormsModule],
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {
  @Input() idUser: string = "";  
  userForm: FormGroup;
  title: string = "Nuevo Usuario";
  usersService = inject(UsersService);
  router = inject(Router);
  route = inject(ActivatedRoute);

  constructor() {
    this.userForm = new FormGroup({
      _id: new FormControl(null),
      first_name: new FormControl("", [Validators.required]),
      last_name: new FormControl("", [Validators.required]),
      username: new FormControl("", [Validators.required]),
      email: new FormControl("", [Validators.required, Validators.email]),
      image: new FormControl("", [Validators.required])
    });
  }

  async ngOnInit() {
    this.route.params.subscribe(async params => {
      if (params['id']) {
        this.idUser = params['id'];
        this.title = "Actualizar Usuario";

        try {
          const user = await this.usersService.getById(this.idUser);
          console.log('Datos del usuario obtenidos:', user);

          this.userForm.setValue({
            _id: user._id,
            first_name: user.first_name,
            last_name: user.last_name,
            username: user.username,
            email: user.email,
            image: user.image
          });

        } catch (error: any) {
          await Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'No se pudo obtener el usuario'
          });
        }
      }
    });
  }

  async getDataForm() {
    if (this.userForm.invalid) {
      await Swal.fire({
        icon: 'warning',
        title: 'Campos incompletos',
        text: 'Por favor, completa todos los campos correctamente'
      });
      return;
    }

    // Confirmación antes de crear o actualizar
    const result = await Swal.fire({
      title: this.idUser ? '¿Actualizar usuario?' : '¿Crear usuario?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Sí',
      cancelButtonText: 'Cancelar'
    });

    if (!result.isConfirmed) return;

    try {
      let response;
      if (this.userForm.value._id) {
        response = await this.usersService.update(this.userForm.value._id, this.userForm.value);
        await Swal.fire({
          icon: 'success',
          title: 'Usuario actualizado',
          text: 'Se actualizó correctamente',
          timer: 2000,
          showConfirmButton: false
        });
      } else {
        response = await this.usersService.insert(this.userForm.value);
        await Swal.fire({
          icon: 'success',
          title: 'Usuario creado',
          text: 'Se creó correctamente',
          timer: 2000,
          showConfirmButton: false
        });
      }

      if (response) this.router.navigate(['/home']);
    } catch (error: any) {
      await Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No se pudo guardar el usuario'
      });
    }
  }
}
