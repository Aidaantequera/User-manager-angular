import { Component, Input, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { IUsers } from '../../interfaces/iusers';
import { UsersService } from '../../services/users.service';
import { toast } from 'ngx-sonner';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-form',
  imports: [ReactiveFormsModule],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.css'
})
export class UserFormComponent {
  @Input() idUser: string = "";
  UserForm: FormGroup = new FormGroup({}, []);
  user!: IUsers;
  usersService = inject(UsersService);
  title: string = "Guardar";
  router = inject(Router);
  route = inject(ActivatedRoute);

  async ngOnInit() {
    this.route.params.subscribe(async params => {
      this.idUser = params['id'];

      if (this.idUser) {
        this.title = 'ACTUALIZAR';
        try {
          this.user = await this.usersService.getById(this.idUser);
          this.UserForm = new FormGroup({
            _id: new FormControl(this.user._id, []),
            first_name: new FormControl(this.user.first_name, []),
            last_name: new FormControl(this.user.last_name, []),
            username: new FormControl(this.user.username, []),
            email: new FormControl(this.user.email, []),
            image: new FormControl(this.user.image, []),
          });
        } catch (msg: any) {
          toast.error(msg.error.error);
        }
      } else {
        this.title = 'NUEVO';
        this.UserForm = new FormGroup({
          _id: new FormControl(null, []),
          first_name: new FormControl("", []),
          last_name: new FormControl("", []),
          username: new FormControl("", []),
          email: new FormControl("", []),
          image: new FormControl("", []),
        });
      }
    });
  }

  async getDataForm() {
    let response: IUsers | any;
    try {
      if (this.UserForm.value._id) {
        response = await this.usersService.update(this.UserForm.value);
      } else {
        response = await this.usersService.insert(this.UserForm.value);
      }

      if (response.createdAt || response.updatedAt) {
        this.router.navigate(['/home']);
      }
    } catch (msg: any) {
      if (msg.status === 400) {
        msg.error.forEach((oneError: any) => toast.error(oneError.message));
      }
    }
  }
}