import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormResetPassword } from 'src/app/models/forms/reset-password.form';

import { UserHttpService } from 'src/app/services/http/user.http.service';
import { UserSessionService } from 'src/app/services/session/user-session.service';


@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent {

  private _formResetPassword: FormGroup = FormResetPassword();
  get FormResetPassword(): FormGroup { return this._formResetPassword }

  get ConfirmPassword(): any { return this._formResetPassword.get('passwdConfirm'); }
  get Password(): any { return this._formResetPassword.get('password'); }

  get User():any {return this._user}
  private _user : any;

  constructor(
    private _route: ActivatedRoute,
    private _httpUser: UserHttpService,
    private _session : UserSessionService,
    private _router: Router
  ) { }

  ngOnInit(): void {
    this._route.url.subscribe(segments => {
      let token = segments[1].path
      // console.log(token)
      this._httpUser.getUserByToken(token).subscribe({
        next: (data: any) => {
          this._user = data
          //console.log(data)
        },
        error: (data: any) => {
          console.log(data)
          this._session.clearSession();
          this._router.navigate(['']);
        }
      })
    });
  }

  resetPassword() {
    if (this._formResetPassword.valid) {
      this._httpUser.resetPassword(this.FormResetPassword.value.password,this._user.email).subscribe({
        next: (data: any) => {
          this._session.saveSession(data);
          this._router.navigate(['login']);
        },
        error: (data: any) => {
          console.log(data)
        }
  
      })
    }
    else{
      alert('formulaire invalide')
    }
  }
}
