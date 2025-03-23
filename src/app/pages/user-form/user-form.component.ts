import { Component, inject, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UsersService } from '../../services/users.service';
import { toast } from 'ngx-sonner';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-form',
  imports: [ReactiveFormsModule],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.css'
})
export class UserFormComponent implements OnInit {
  @Input() idUser: string = "";  
  userForm: FormGroup;
  title: string = "Nuevo Usuario";
  usersService = inject(UsersService);
  router = inject(Router);
  route = inject(ActivatedRoute);

  constructor() {
    // Inicializar el formulario vacío
    this.userForm = new FormGroup({
      _id: new FormControl(null),
      first_name: new FormControl("",[Validators.required]),
      last_name: new FormControl("",[Validators.required]),
      username: new FormControl("",[Validators.required]),
      email: new FormControl("",[Validators.required,Validators.email]),
      image: new FormControl("",[Validators.required])
    });
  }

  async ngOnInit() {
    // Verificar si hay un ID en la ruta
    this.route.params.subscribe(async params => {
      if (params['id']) {
        this.idUser = params['id'];
        this.title = "Actualizar Usuario";

        try {
          const user = await this.usersService.getById(this.idUser);
          console.log('Datos del usuario obtenidos:', user);
          
          // Cargar los datos en el formulario
          this.userForm.setValue({
            _id: user._id,
            first_name: user.first_name,
            last_name: user.last_name,
            username: user.username,
            email: user.email,
            image: user.image
          });

        } catch (error: any) {
          toast.error("Error al obtener el usuario.");
        }
      }
    });
  }

  async getDataForm() {
    if (this.userForm.invalid) {
      toast.error("Por favor, completa todos los campos correctamente.");
      return;
    }
    
    try {
      let response;
      if (this.userForm.value._id) {
        // 🔹 Ahora pasamos el ID como primer parámetro en update()
        response = await this.usersService.update(this.userForm.value._id, this.userForm.value);
        toast.success('Usuario actualizado correctamente');
      } else {
        response = await this.usersService.insert(this.userForm.value);
        toast.success('Usuario creado correctamente');
  
        this.usersService.getAll().then(users => {
          console.log("Usuarios actualizados:", users);
        });
      }
  
      if (response) this.router.navigate(['/home']);
    } catch (error: any) {
      toast.error('Error al guardar el usuario');
    }
  }
  
}
