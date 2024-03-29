import {Component, OnInit } from '@angular/core';
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

  private _id :any
  get Id(): any { return this._id; }

  private formClub: FormGroup = FClub();
  private formAdress: FormGroup = FAdress();

  get FormClub(): FormGroup { return this.formClub; }
  get FormAdress(): FormGroup { return this.formAdress; }

  get Name():any {return this.formClub.get('name');}
  get Adress():any {return this.formClub.get('adress');}
  get Street():any {return this.formAdress.get('street')}
  get Number():any {return this.formAdress.get('number')}
  get City():any {return this.formAdress.get('city')}
  get PostCode():any {return this.formAdress.get('postCode')}
  get Country():any {return this.formAdress.get('country')}

  get Errors():any{return this.formClub.errors}

  private _user! : any
  get User(): any { return this._user; }

  private _club : any 
  get Club(): any  { return this._club; }


  constructor(
    private route: ActivatedRoute,
    private _session : UserSessionService,
    private _clubHttpService : ClubHttpService,
    private _router : Router,
    ) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this._id = (params['id']);
    });
    this.getUser()
    console.log(this._id)
    if(this._id){
      this.getClubById(this._id)
    }
 }
 private getUser(){
   this._session.$user.subscribe({
    next : (data :any) =>{
      this._user = data
      console.log(this._user)
      if(this._user.id){

      }
    },
    error : (error) => {
      console.log(error)
    }}) ;
 }

 private getClubById(id : any){
  this._clubHttpService.getClubById(id).subscribe({
    next : (data :any) =>{
      this._club = data
      if(this._club.id){
        this.addToFormClub()
        this.addToFormAdress()
      }
      console.log(this._club)
    },
    error : (error) => {
      console.log(error)
    }}) ;
 }

 private addToFormClub(){
  let form = {
    id : this._club.id,
    name : this._club.name,
  }
  this.formClub.patchValue(form);
}

private addToFormAdress(){
  let form = {
    id : this._club.adress.id,
    street : this._club.adress.street,
    number : this._club.adress.number,
    city : this._club.adress.city,
    postCode : this._club.adress.postCode,
    country : this._club.adress.country,
  }
  this.formAdress.patchValue(form);
}

addValues(){
  if(this.formAdress.value.id){this.formClub.value.adress.id = this.formAdress.value.id}
  if(this.formAdress.value.street){this.formClub.value.adress.street = this.formAdress.value.street} 
  if(this.formAdress.value.number){this.formClub.value.adress.number = this.formAdress.value.number} 
  if(this.formAdress.value.city){this.formClub.value.adress.city = this.formAdress.value.city}
  if(this.formAdress.value.postCode){this.formClub.value.adress.postCode = this.formAdress.value.postCode}
  if(this.formAdress.value.country){this.formClub.value.adress.country = this.formAdress.value.country}
}

update() {
this.formClub.value.creatorId = this._user.id
this.addValues()
// console.log(this.formClub)
// console.log(this._id)
if (this.formClub.valid) {
  if(this._id){
    console.log('update')
    this._clubHttpService.update(this.formClub.value).subscribe({
      next: (data: any) => {
        this._club = data
        this._router.navigate(['my-clubs'])
      },
      error: (error) => {
        console.log(error);
      }
    });
    }
  
  else{
    console.log(this.formClub)
    console.log('insert')
    delete this.formClub.value.id
    this.formClub.value.adress.street ? this.addValues() : this.formClub.value.adress = null
    this._clubHttpService.insert(this.formClub.value).subscribe({
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

  unparticipe(id : any){
    this._clubHttpService.unParticipe(id,this._club.id).subscribe({
      next : (data :any) =>{
        this.getClubById(this._id)
      },
      error : (error) => {
        console.log(error)
      }}) ;
  }
}


