
import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FRegister } from '../../../models/forms/register.form';
import { UserHttpService } from 'src/app/services/http/user.http.service';
import { IUser } from 'src/app/models/interfaces/user.model';
import { UserSessionService } from 'src/app/services/session/user-session.service';
import { Router } from '@angular/router';
import { ModalDataService } from 'src/app/services/modal/modal.data.service';
import { MatDialog } from '@angular/material/dialog';
import { ConditionModalComponent } from '../../modals/conditionModal/conditionModal.component';

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
  get Condition():any {return this.formRegister.get('condition');}
  get Errors():any{return this.formRegister.errors}

  constructor(
    private _userHttpService: UserHttpService,
    private _session : UserSessionService,
    private _route : Router,
    private _modalDataService : ModalDataService,
    public dialog: MatDialog,
    )
    { }

  handleSubmitAction(){
    //console.log(this.formRegister.valid, this.formRegister.value);
    if (this.formRegister.valid) {
      delete this.FormRegister.value.passwordConfirm
      this._userHttpService.register(this.formRegister.value).subscribe((data :IUser) =>{
        this._session.saveSession(data)
        // console.log(data)
        this._route.navigate([''])

      }, error => {
        console.log(error)
        // console.clear()
        if(error.message == "Email deja prit") alert(error.message);

      }) ;
    }
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


