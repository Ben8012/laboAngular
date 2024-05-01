import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FLogin } from '../../../models/forms/login.form';
import { UserHttpService } from 'src/app/services/http/user.http.service';
import { UserSessionService } from 'src/app/services/session/user-session.service';
import { IUser } from 'src/app/models/interfaces/user.model';
import { ChatService } from 'src/app/services/http/chat.http.service';
import { ModalDataService } from 'src/app/services/modal/modal.data.service';
import { MatDialog } from '@angular/material/dialog';
import { ConditionModalComponent } from '../../modals/conditionModal/conditionModal.component';
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
  
  get Condition():any {return this.formLogin.get('condition');}

  public errorMessage: string = '';

  constructor(
      private _userHttpService : UserHttpService,
      private _route : Router,
      private _session : UserSessionService,
      private _chatService : ChatService,
      private _modalDataService : ModalDataService,
      public dialog: MatDialog,
     ) { }

  

  login(){
    console.log(this.formLogin)
    if(this.formLogin.valid){
      this._userHttpService.login(this.formLogin.value).subscribe({
        next : (data :any) =>{
          this._session.saveSession(data)
          this._session.refreshUser(data)
          this._chatService.connection()
          this._route.navigate([''])
        },
        error : (error) => {
          this.errorMessage = 'Login et / ou mot de passe incorrecte';
          console.log(error)
        }}) ;
    }

  }

  resetPassword(){
    let email = this.formLogin.value.email
    this._userHttpService.sendEmailToResetPassword(email).subscribe({
      next : (data : any)=>{
        alert("un email vous a été envoyé sur l'adresse "+email+" !")
        this._route.navigate(['']);
      },
      error:(error : any)=> {
        console.log(error)
      } 
    })
  }

  checkCondition(){
    //this._modalDataService.setData(creator);
    document.body.classList.add('modal-open');
    const dialogRef = this.dialog.open(ConditionModalComponent);

    dialogRef.afterClosed().subscribe(result => {
      // console.log('Le modal est fermé');
      document.body.classList.remove('modal-open'); 
    });
  }


}
