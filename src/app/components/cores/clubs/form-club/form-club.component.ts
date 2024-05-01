import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FAdress } from 'src/app/models/forms/adress.form';
import { FClub } from 'src/app/models/forms/club.form';
import { ClubHttpService } from 'src/app/services/http/club.http.service';
import { UserSessionService } from 'src/app/services/session/user-session.service';

@Component({
  selector: 'app-form-club',
  templateUrl: './form-club.component.html',
  styleUrls: ['./form-club.component.scss'],
})
export class FormClubComponent implements OnInit {

  showAddressForm: boolean = false;

  private _id: any

  private _clubToSend : any ={
    id : null,
    name : null,
    creatorId : null,
    adress : null
  }

  private _url: any
  private _urlSegements: any
  get UrlSegements(): any { return this._urlSegements[0].path; }

  private _activateButtons: any
  get ActivateButtons(): any[] { return this._activateButtons; }

  private formClub: FormGroup = FClub();
  get FormClub(): FormGroup { return this.formClub; }

  get Name(): any { return this.formClub.get('name'); }
  get Errors(): any { return this.formClub.errors }

  private _user!: any
  get User(): any { return this._user; }

  private _club: any
  get Club(): any { return this._club; }


  constructor(
    private route: ActivatedRoute,
    private _session: UserSessionService,
    private _clubHttpService: ClubHttpService,
    private _router: Router,
  ) { }

  ngOnInit() {
    this.route.url.subscribe(segments => {
      this._urlSegements = segments
      this._url = segments.join('/');
      // console.log("L'URL a changé :", this._url);

      this.getUser()
      if (segments.length > 0 && segments[0].path === "update-club") {
        //console.log("URL contient 'update-club'");
        this._id = segments[1].path
        this.getClubById(this._id)
        this._activateButtons = false
      }
    });
  }

  private getUser() {
    this._session.$user.subscribe({
      next: (data: any) => {
        this._user = data
        //console.log(this._user)
        if (this._user.id) {
        }
      },
      error: (error) => {
        console.log(error)
      }
    });
  }

  private getClubById(id: any) {
    this._clubHttpService.getClubById(id).subscribe({
      next: (data: any) => {
        this._club = data
        if (this._club.id) {
          this.addToFormClub()
          if (this._club.adress) {
            this.addAddressToFormClub(this._club.adress)
          }
          else{
            this.formClub.value.adress = null
          }
        }
        // console.log(this._club)
      },
      error: (error) => {
        console.log(error)
      }
    });
  }

  private addToFormClub() {
    let form = {
      id: this._club.id,
      name: this._club.name,
      creatorId : this._user.id,
    }
    this.formClub.patchValue(form);
    //console.log(this.formClub.value)
  }

  send() {
    // console.log(this.formClub.value)
    // console.log(this.formClub)
    if (this.formClub.valid) {
      this._clubToSend.name = this.formClub.value.name
      this._clubToSend.creatorId = this._user.id

      if (this._urlSegements[0].path === "update-club") {
        this._clubToSend.id = this._club.id
        // console.log('update')
        this._clubHttpService.update(this._clubToSend).subscribe({
          next: (data: any) => {
            this._club = data
            this._router.navigate(['my-clubs'])
          },
          error: (error) => {
            console.log(error);
          }
        });
      }
      else if (this._urlSegements[0].path === "insert-club") {
        // console.log('insert')
        this._clubHttpService.insert(this._clubToSend).subscribe({
          next: (data: any) => {
            this._club = data
            this._router.navigate(['my-clubs'])
          },
          error: (error) => {
            console.log(error);
          }
        });
      }
    }
  }

  unparticipe(id: any) {
    this._clubHttpService.unParticipe(id, this._club.id).subscribe({
      next: (data: any) => {
        this.getClubById(this._id)
      },
      error: (error) => {
        console.log(error)
      }
    });
  }

  toggleAddressForm() {
    this.showAddressForm = !this.showAddressForm;
  }

  OutputAdress(adress: any) {
    this.addAddressToFormClub(adress)
  }

  private addAddressToFormClub(adress: any) {
    this._clubToSend.adress = {
      id: adress.id,
      street: adress.street,
      city: adress.city,
      postCode: adress.postCode,
      number: adress.number,
      country: adress.country
    }
    // console.log(this._clubToSend)
  }

  // disableControlFormAdress() {
  //   this.Adress.get('street')?.disable();
  //   this.Adress.get('number')?.disable();
  //   this.Adress.get('city')?.disable();
  //   this.Adress.get('postCode')?.disable();
  //   this.Adress.get('country')?.disable();
  // }

  // enableControlFormAdress() {
  //   this.Adress.get('street')?.enable();
  //   this.Adress.get('number')?.enable();
  //   this.Adress.get('city')?.enable();
  //   this.Adress.get('postCode')?.enable();
  //   this.Adress.get('country')?.enable();
  // }
}


