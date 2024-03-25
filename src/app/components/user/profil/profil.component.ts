import { FProfil } from '../../../models/forms/profil.form';
import { Component } from '@angular/core';
// import { SessionService } from '../../services/session/user-session.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormControl, FormGroup, Validators } from "@angular/forms"
import { ActivatedRoute, Route, Router } from '@angular/router';
import { UserSessionService } from 'src/app/services/session/user-session.service';
import { UserHttpService } from 'src/app/services/http/user.http.service';
import { concatMap } from 'rxjs';
import { ImageHttpService } from 'src/app/services/http/image.http.service';


@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss']
})
export class ProfilComponent {
  selectedFilePhoto!: File;
  selectedFileInsurance!: File;
  selectedFileLevel!: File;
  selectedFileCertificat!: File;

  private userSessionId: number | null = null;
  private _user: any|null = null;

  private formProfil: FormGroup = FProfil();
  get FormProfil(): FormGroup { return this.formProfil; }

  get Lastname():any {return this.formProfil.get('lastname');}
  get Firstname():any {return this.formProfil.get('firstname');}
  get Email():any {return this.formProfil.get('email');}
  get Birthdate():any {return this.formProfil.get('birthdate');}

  private _imageInsurance : any
  get ImageInsurance(): any  { return this._imageInsurance; }

  private _imageLevel : any
  get ImageLevel(): any  { return this._imageLevel; }

  private _imageCertificat : any
  get ImageCertificat(): any  { return this._imageCertificat; }

  private _imageProfil : any
  get ImageProfil(): any  { return this._imageProfil; }

  constructor(
    private _http: HttpClient,
    private _route : ActivatedRoute,
    private _router : Router,
    private _session : UserSessionService,
    private _userHttpService : UserHttpService,
    private _imageHttpService : ImageHttpService
    )
  {}

  ngOnInit() {
    this.getUser();
  }

  private getImages(){
    this._imageHttpService.getInsuranceImage(this._user.guidInsurance).subscribe(imageData => {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this._imageInsurance = e.target.result;
      }
      reader.readAsDataURL(imageData);
    });
    this._imageHttpService.getLevelImage(this._user.guidLevel).subscribe(imageData => {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this._imageLevel = e.target.result;
      }
      reader.readAsDataURL(imageData);
    });
    this._imageHttpService.getCertificatImage(this._user.guidCertificat).subscribe(imageData => {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this._imageCertificat = e.target.result;
      }
      reader.readAsDataURL(imageData);
    });
    this._imageHttpService.getProfilImage(this._user.guidImage).subscribe(imageData => {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this._imageProfil = e.target.result;
      }
      reader.readAsDataURL(imageData);
    });
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
            this.getImages()
          }
          console.log(this._user)
          
      },
      error:(data :any) => {
        console.log(data);
      }
    })
  }

  onFileSelectedPhoto(event :any): void {
    this.selectedFilePhoto = event.target.files[0];
  }

  onFileSelectedInsurance(event :any): void {
    this.selectedFileInsurance = event.target.files[0];
  }

  onFileSelectedLevel(event :any): void {
    this.selectedFileLevel = event.target.files[0];
  }

  onFileSelectedCertificat(event :any): void {
    this.selectedFileCertificat = event.target.files[0];
  }



  update() {
    if (this.formProfil.valid) {
      this._userHttpService.update(this.formProfil.value, this._user.id).subscribe({
        next: (data: any) => {
          this._session.refreshUser(this._user.id)
        },
        error: (error) => {
          console.log(error);
        }
      });
    }
  }

  addPhoto(){
    if (!this.selectedFilePhoto) {
      console.error('No file selected');
      return;
    }
    const formData = new FormData();
    formData.append('image', this.selectedFilePhoto, this._user.firstname+" "+this._user.lastname);

    delete this.formProfil.value.image;

    this._imageHttpService.insertProfilImage(formData,this._user.id).subscribe({
      next: (data: any) => {
        this._session.refreshUser(this._user.id)
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  addInsurance(){
    if (!this.selectedFileInsurance) {
      console.error('No file selected');
      return;
    }
    const formData = new FormData();
    formData.append('image', this.selectedFileInsurance, this._user.firstname+" "+this._user.lastname);

    delete this.formProfil.value.image;

    this._imageHttpService.insertInsuranceImage(formData,this._user.id).subscribe({
      next: (data: any) => {
        this._session.refreshUser(this._user.id)
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  addLevel(){
    if (!this.selectedFileLevel) {
      console.error('No file selected');
      return;
    }
    const formData = new FormData();
    formData.append('image', this.selectedFileLevel, this._user.firstname+" "+this._user.lastname);

    delete this.formProfil.value.image;

    this._imageHttpService.insertLevelImage(formData,this._user.id).subscribe({
      next: (data: any) => {
        this._session.refreshUser(this._user.id)
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  addCertificate(){
    if (!this.selectedFileCertificat) {
      console.error('No file selected');
      return;
    }
    const formData = new FormData();
    formData.append('image', this.selectedFileCertificat, this._user.firstname+" "+this._user.lastname);

    delete this.formProfil.value.image;

    this._imageHttpService.insertCertificatImage(formData,this._user.id).subscribe({
      next: (data: any) => {
        this._session.refreshUser(this._user.id)
      },
      error: (error) => {
        console.log(error);
      }
    });
  }
}
