import { FProfil } from './forms/profil.form';
import { Component } from '@angular/core';
import { SessionService } from '../../modules/security/services/session.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormControl, FormGroup, Validators } from "@angular/forms"
import { ActivatedRoute, Route, Router } from '@angular/router';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss']
})
export class ProfilComponent {

  private userSessionId: number | null = null;
  private user: any|null = null;

  private formProfil: FormGroup = FProfil();
  get FormProfil(): FormGroup { return this.formProfil; }

  get Lastname():any {return this.formProfil.get('lastName');}
  get Firstname():any {return this.formProfil.get('firstName');}
  get Email():any {return this.formProfil.get('email');}
  get Birthdate():any {return this.formProfil.get('birthdate');}

  constructor(
    private $session: SessionService<any>,
    private $http: HttpClient,
    private $route : ActivatedRoute
    )
  {
    this.$session.subscribe(user => this.user = user)

  }

  ngOnInit() {
    this.$route.data.subscribe(({profile}) => {
      //console.log(profile)
      this.formProfil.patchValue(profile);
      this.userSessionId = profile.id;
    })
  }

  handleSubmitAction() {
    if (this.formProfil.valid ) {
      console.log(this.formProfil.value)
      console.log(this.userSessionId)
      const headers = new HttpHeaders({'Authorization': `Bearer ${this.user.token}`});

      this.$http.put<any>(`https://localhost:7231/api/User/Update`, this.formProfil.value,{headers})
        .subscribe(user => console.log(user));
        //this.$route.navigate(['/home'])
    }
  }

}
