import { FProfil } from '../../../models/forms/profil.form';
import { Component } from '@angular/core';
// import { SessionService } from '../../services/session/user-session.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormControl, FormGroup, Validators } from "@angular/forms"
import { ActivatedRoute, Route, Router } from '@angular/router';
import { UserSessionService } from 'src/app/services/session/user-session.service';


@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss']
})
export class ProfilComponent {

  private userSessionId: number | null = null;
  private _user: any|null = null;

  private formProfil: FormGroup = FProfil();
  get FormProfil(): FormGroup { return this.formProfil; }

  get Lastname():any {return this.formProfil.get('lastname');}
  get Firstname():any {return this.formProfil.get('firstname');}
  get Email():any {return this.formProfil.get('email');}
  get Birthdate():any {return this.formProfil.get('birthdate');}
  get Image():any {return this.formProfil.get('image');}

  constructor(
    private _http: HttpClient,
    private _route : ActivatedRoute,
    private _router : Router,
    private _session : UserSessionService
    )
  {}

  ngOnInit() {
    this._session.$user.subscribe({
      next: (data : any) => {
          this._user = data;
          console.log(this._user)
          if(this._user){
            let form = {
              firstname : this._user.firstname,
              lastname : this._user.lastname,
              birthdate : this._user.birthdate.substring(0,10),
              email : this._user.email,
              photo : "",
            }
            this.formProfil.patchValue(form);
          }
      },
      error:(data :any) => {
        console.log(data);
      }
    })
  }

  handleSubmitAction() {
    if (this.formProfil.valid ) {
      console.log(this.formProfil.value.image)
      //console.log(this.userSessionId)
      this.formProfil.value.image = btoa(this.formProfil.value.image)

      //const headers = new HttpHeaders({'Authorization': `Bearer ${this.user.token}`});

      this._http.put<any>('https://localhost:7231/api/User/'+this._user.id, this.formProfil.value
     // ,{headers}
      )
        .subscribe(user => console.log(user));
        //this._router.navigate(['/home'])
    }
  }

}
