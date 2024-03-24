import { FProfil } from '../../../models/forms/profil.form';
import { Component } from '@angular/core';
// import { SessionService } from '../../services/session/user-session.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormControl, FormGroup, Validators } from "@angular/forms"
import { ActivatedRoute, Route, Router } from '@angular/router';
import { UserSessionService } from 'src/app/services/session/user-session.service';
import { UserHttpService } from 'src/app/services/http/user.http.service';
import { concatMap } from 'rxjs';


@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss']
})
export class ProfilComponent {
  selectedFile!: File;

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
    private _session : UserSessionService,
    private _userHttpService : UserHttpService
    )
  {}

  ngOnInit() {
    this.getUser();
  }

  private addToForm(){
      let form = {
        firstname : this._user.firstname,
        lastname : this._user.lastname,
        birthdate : this._user.birthdate.substring(0,10),
        email : this._user.email,
        photo : "",
      }
      this.formProfil.patchValue(form);
  }

  private getUser(){
    this._session.$user.subscribe({
      next: (data : any) => {
          this._user = data;
          if(this._user.id){
            this.addToForm()
          }
          console.log(this._user)
          
      },
      error:(data :any) => {
        console.log(data);
      }
    })
  }

  onFileSelected(event :any): void {
    this.selectedFile = event.target.files[0];
  }

  update() {
    if (this.formProfil.valid) {
      if (!this.selectedFile) {
        console.error('No file selected');
        return;
      }
      console.log(this.selectedFile)
      const formData = new FormData();
      formData.append('image', this.selectedFile, this._user.firstname+" "+this._user.lastname);
  
      delete this.formProfil.value.image;
  
      this._userHttpService.update(this.formProfil.value, this._user.id).pipe(
        concatMap(() => {
          return this._userHttpService.updateImageProfile(formData, this._user.id)
        })
      ).subscribe({
        next: (data: any) => {
          console.log(data);
        },
        error: (error) => {
          console.log(error);
        }
      });
    }
  }
}
