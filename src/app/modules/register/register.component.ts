
import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FRegister } from './forms/register.form';
import { SessionService } from '../../modules/security/services/session.service';
import { AuthService } from '../../modules/security/services/auth.service';
import {AbstractControl, ValidationErrors, ValidatorFn} from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  private formRegister: FormGroup = FRegister();

  get FormRegister(): FormGroup { return this.formRegister; }

  get Lastname():any {return this.formRegister.get('lastname');}
  get Firstname():any {return this.formRegister.get('firstname');}
  get Email():any {return this.formRegister.get('email');}
  get Birthdate():any {return this.formRegister.get('birthdate');}
  get Password():any {return this.formRegister.get('password');}
  get ConfirmPassword():any {return this.formRegister.get('passwordConfirm');}
  get Errors():any{return this.formRegister.errors}

  constructor(
    private $session: SessionService<{ id: number, label: string }>,
    private $auth: AuthService,

      ) { }

  handleSubmitAction(){
    console.log(this.formRegister.valid, this.formRegister.value);
    if (this.formRegister.valid) {
      //const {email, password, username} = this.formRegister.value;
      this.$auth.register(this.formRegister.value);
    }
  }


}


