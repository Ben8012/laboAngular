
import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FRegister } from '../../models/forms/register.form';
import { ApiUserService } from 'src/app/services/api/api-user.service';
import { IUser } from 'src/app/models/interfaces/user.model';
import { UserSessionService } from 'src/app/services/session/user-session.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  public errorMessage: string = '';

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
    private _apiUserService: ApiUserService,
    private _session : UserSessionService,
    )
    { }

  handleSubmitAction(){
    //console.log(this.formRegister.valid, this.formRegister.value);
    if (this.formRegister.valid) {
      delete this.FormRegister.value.passwordConfirm
      this._apiUserService.register(this.formRegister.value).subscribe((data :IUser) =>{
        this._session.saveSession(data)
      }, error => {
        this.errorMessage = 'Login et / ou mot de passe incorrecte';
      }) ;
    }
  }


}


