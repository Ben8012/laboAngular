import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FLogin } from '../../../models/forms/login.form';
import { UserHttpService } from 'src/app/services/http/user.http.service';
import { UserSessionService } from 'src/app/services/session/user-session.service';
import { IUser } from 'src/app/models/interfaces/user.model';
// import { SessionService } from '../../modules/security/services/session.service';
// import { AuthService } from '../../modules/security/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  private formLogin: FormGroup = FLogin();
  get FormLogin(): FormGroup { return this.formLogin; }

  public errorMessage: string = '';

  constructor(
      private _userHttpService : UserHttpService,
      private _route : Router,
      private _session : UserSessionService,
     ) { }



  login(){
    if(this.formLogin.valid){
      this._userHttpService.login(this.formLogin.value).subscribe({
        next : (data :IUser) =>{
          this._session.saveSession(data)
          console.log(data)
          this._route.navigate([''])
        },
        error : (error) => {
          this.errorMessage = 'Login et / ou mot de passe incorrecte';
          console.log(error)
        }}) ;
    }

  }

}
