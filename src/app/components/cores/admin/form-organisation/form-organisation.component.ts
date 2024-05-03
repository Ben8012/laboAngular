import {  Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FOrganisation } from 'src/app/models/forms/organisation.form';
import { ImageHttpService } from 'src/app/services/http/image.http.service';
import { OrganisationHttpService } from 'src/app/services/http/organisation.http.service';
import { UserSessionService } from 'src/app/services/session/user-session.service';

@Component({
  selector: 'app-form-organisation',
  templateUrl: './form-organisation.component.html',
  styleUrls: ['./form-organisation.component.scss'],
})
export class FormOrganisationComponent implements OnInit {

  selectedFileOrganisation!: File;
  private _imageOrganisation : any
  get ImageOrganisation(): any  { return this._imageOrganisation; }

  private _id :any
  get Id(): any { return this._id; }

  private _urlSegements : any
  get UrlSegements(): any { return this._urlSegements; }

  private _organisation : any 
  get Organisation(): any  { return this._organisation; }

  private _user : any 
  get User(): any  { return this._user; }

  private _organisationToSend : any = {
    id : null,
    name : null,
    creatorId : null,
    adress : null
  }

  private formOrganisation: FormGroup = FOrganisation();
  get FormOrganisation(): FormGroup { return this.formOrganisation; }
  get Name():any {return this.formOrganisation.get('name');}
  get Errors():any{return this.formOrganisation.errors}

  constructor(
    private route: ActivatedRoute,
    private _session : UserSessionService,
    private _organisationHttpService : OrganisationHttpService,
    private _router : Router,
    private _imageHttpService : ImageHttpService,
    private _sanitizer: DomSanitizer,
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this._id = (params['id']);
    });
    this.route.url.subscribe(segments => {
      this._urlSegements = segments[0].path;
   

      this.getUser()

      if (this._id && segments.length > 0 && segments[0].path === "update-organisation") {
        this.getOrganisationById(this._id)
      }
    });
  }

  private getUser(){
    this._session.$user.subscribe({
     next : (data :any) =>{
       this._user = data
     },
     error : (error) => {
       console.log(error)
     }}) ;
  }

  private getOrganisationById(id : any){
    this._organisationHttpService.getById(id).subscribe({
      next : (data :any) =>{
        this._organisation = data
        if(this._organisation.id){
          this.addToForm()
          this.getImage()
          
          if (this._organisation.adress) {
            this.addAddressToForm(this._organisation.adress)
          }
          else{
            this.formOrganisation.value.adress = null
          }
          
        }
        // console.log(this._organisation)
      },
      error : (error) => {
        console.log(error)
      }}) ;
   }
  
  
   private addToForm(){
  
    let form = {
      id : this._organisation.id,
      name : this._organisation.name,
    }
    this.formOrganisation.patchValue(form);
  }

  private addAddressToForm(adress: any) {
    this._organisationToSend.adress = {
      id: adress.id,
      street: adress.street,
      city: adress.city,
      postCode: adress.postCode,
      number: adress.number,
      country: adress.country
    }
    // console.log(this._organisationToSend)
  }


  OutputAdress(adress: any) {
    this.addAddressToForm(adress)
  }
  
  
  send() {
    // console.log(this.formSite.value)
    // console.log(this.formSite)
    if (this.formOrganisation.valid) {
      this._organisationToSend.name = this.formOrganisation.value.name


      // console.log(this._organisationToSend)
   
      if (this._urlSegements === "update-organisation") {
        this._organisationToSend.id = this._organisation.id
        // console.log('update')
        this._organisationHttpService.update(this._organisationToSend).subscribe({
          next: (data: any) => {
            this._organisation = data
            this._router.navigate(['admin-home/training'])
          },
          error: (error) => {
            console.log(error);
          }
        });
      }
      else if (this._urlSegements === "insert-organisation") {
        // console.log('insert')
        this._organisationHttpService.insert(this._organisationToSend).subscribe({
          next: (data: any) => {
            this._organisation = data
            this._router.navigate(['admin-home/training'])
          },
          error: (error) => {
            console.log(error);
          }
        });
      }
    }
  }

  onFileSelectedOrganisation(event :any): void {
    this.selectedFileOrganisation = event.target.files[0];
    this.addOrganisation(this._organisation)
  }

  addOrganisation(organisation : any){
    if (!this.selectedFileOrganisation) {
      console.error('No file selected');
      return;
    }
    const formData = new FormData();
    formData.append('image', this.selectedFileOrganisation, organisation.name+organisation.id);

    this._imageHttpService.insert(formData,organisation.id,"OrganisationImage").subscribe({
      next: (data: any) => {
        this.getOrganisationById(this._id)
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  private getImage(){
    if(this._organisation.guidImage != null){
      this._imageHttpService.getImage(this._organisation.id,"OrganisationImage").subscribe(imageData => {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          //this._imageSite = e.target.result;
          this._imageOrganisation = this._sanitizer.bypassSecurityTrustResourceUrl(e.target.result);
        }
        reader.readAsDataURL(imageData);
      });
    }
  }
}
