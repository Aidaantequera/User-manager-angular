import { Component, Input } from '@angular/core';
import { FormGroup, NgModel, ReactiveFormsModule } from '@angular/forms';
import { IUsers } from '../../interfaces/iusers';

@Component({
  selector: 'app-user-form',
  imports: [ReactiveFormsModule],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.css'
})
export class UserFormComponent {
  @Input() idUser: string = ""
  UserForm: FormGroup = new FormGroup({}, [])
  users!: IUsers;

  getDataForm(){

  }
}
