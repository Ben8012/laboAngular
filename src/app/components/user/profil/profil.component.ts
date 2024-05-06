import { FProfil } from '../../../models/forms/profil.form';
import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormGroup } from "@angular/forms"
import { ActivatedRoute, Router } from '@angular/router';
import { UserSessionService } from 'src/app/services/session/user-session.service';
import { UserHttpService } from 'src/app/services/http/user.http.service';
import { ImageHttpService } from 'src/app/services/http/image.http.service';
import { OrganisationHttpService } from 'src/app/services/http/organisation.http.service';
import { Flevel } from 'src/app/models/forms/level.form';
import { TrainingHttpService } from 'src/app/services/http/training.http.service';


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

  get User(): any { return this._user; }
  private _user: any|null = null;


  private _organisations: any
  get Organisations(): any[] { return this._organisations; }

  private _trainings: any
  get Trainings(): any[] { return this._trainings; }

  private formProfil: FormGroup = FProfil();
  get FormProfil(): FormGroup { return this.formProfil; }

  private formLevel: FormGroup = Flevel();
  get FormLevel(): FormGroup { return this.formLevel; }
  
  get Lastname():any {return this.formProfil.get('lastname');}
  get Firstname():any {return this.formProfil.get('firstname');}
  get Email():any {return this.formProfil.get('email');}
  get Birthdate():any {return this.formProfil.get('birthdate');}

  get IsMostLevel():any {return this.formLevel.get('isMostLevel');}
  get RefNumber():any {return this.formProfil.get('refNumber');}

  // private _imageInsurance : any
  // get ImageInsurance(): any  { return this._imageInsurance; }

  // private _imageLevel : any
  // get ImageLevel(): any  { return this._imageLevel; }

  // private _imageCertificat : any
  // get ImageCertificat(): any  { return this._imageCertificat; }

  // private _imageProfil : any
  // get ImageProfil(): any  { return this._imageProfil; }

  constructor(
    private _http: HttpClient,
    private _route : ActivatedRoute,
    private _router : Router,
    private _session : UserSessionService,
    private _userHttpService : UserHttpService,
    private _imageHttpService : ImageHttpService,
    private _organisationHttpService : OrganisationHttpService,
    private _trainingHttpService : TrainingHttpService
  
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
            this.getAllOrganisation()
            this.addToForm()
          }
      },
      error:(data :any) => {
        console.log(data);
      }
    })
  }

  onFileSelectedPhoto(event :any): void {
    this.selectedFilePhoto = event.target.files[0];
    this.addPhoto()
  }

  onFileSelectedInsurance(event :any): void {
    this.selectedFileInsurance = event.target.files[0];
    this.addInsurance()
  }

  onFileSelectedLevel(event :any): void {
    this.selectedFileLevel = event.target.files[0];
    this.addLevel()
  }

  onFileSelectedCertificat(event :any): void {
    this.selectedFileCertificat = event.target.files[0];
    this.addCertificate()
  }

  onSelectedOrganisationId(event :any): void {
    this.getTrainings(event.target.value)
  }

  onSelectedTrainingId(event :any): void {
    this._user.trainings.forEach((training: any) => {
      if(training.id == event.target.value){
        alert("vous avez deja ce niveau")
      }
    });
    this.formLevel.value.trainingId = event.target.value
    this.formLevel.value.userId = this._user.id
  }


  Logout(){
    this._session.clearSession();
    this._router.navigate(['/home']);
  }

  update() {
    if (this.formProfil.valid) {
      this._userHttpService.update(this.formProfil.value, this._user.id).subscribe({
        next: (data: any) => {
          this._session.saveSession(data)
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
    formData.append('image', this.selectedFilePhoto, this._user.firstname+this._user.lastname+this._user.id);

    delete this.formProfil.value.image;

    this._imageHttpService.insert(formData,this._user.id,"ProfilImage").subscribe({
      next: (data: any) => {
        this._session.saveSession(data)
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
    formData.append('image', this.selectedFileInsurance, this._user.firstname+this._user.lastname+this._user.id);

    delete this.formProfil.value.image;

    this._imageHttpService.insert(formData,this._user.id,"InsuranceImage").subscribe({
      next: (data: any) => {
        this._session.saveSession(data)
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
    formData.append('image', this.selectedFileLevel, this._user.firstname+this._user.lastname+this._user.id);

    delete this.formProfil.value.image;

    this._imageHttpService.insert(formData,this._user.id,"LevelImage").subscribe({
      next: (data: any) => {
        this._session.saveSession(data)
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
    formData.append('image', this.selectedFileCertificat, this._user.firstname+this._user.lastname+this._user.id);

    delete this.formProfil.value.image;

    this._imageHttpService.insert(formData,this._user.id,"CertificatImage").subscribe({
      next: (data: any) => {
        this._session.saveSession(data)
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  private getAllOrganisation(){
    this._organisationHttpService.getAll().subscribe({
      next: (data: any) => {
        this._organisations = data
        // console.log(this._organisations)
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  private getTrainings(id : any){
    this._trainingHttpService.getByOrganisationId(id).subscribe({
      next: (data: any) => {
        this._trainings = data
        // console.log(this._trainings)
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  level(){
    // console.log(this.formLevel)
    // console.log(this.formLevel.valid)
    if(this.formLevel.valid){
      this._trainingHttpService.insertUserTraining(this.formLevel.value).subscribe({
        next: (data: any) => {
          this._trainings = data
          this._user = this._session.refreshUser(this._user)
          if(this._user && this._user.id){
            this.addToForm()
            this._session.refreshUser(this._user)
            this.formLevel.value.userId = this._user.id
          }
        },
        error: (error) => {
          console.log(error);
        }
      });
    }
  }

  deletelevel(trainingId : any){
    this._trainingHttpService.deleteUserTraining(trainingId,this._user.id).subscribe({
      next: (data: any) => {
        this._trainings = data
        this._user = this._session.refreshUser(this._user)
        if(this._user && this._user.id){
          this.addToForm()
          this._session.refreshUser(this._user)
        }
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  updatelevel(id : any){
    this._trainingHttpService.updateMostLevel(id,this._user.id).subscribe({
      next: (data: any) => {
        this._trainings = data
        this._user = this._session.refreshUser(this._user)
        if(this._user && this._user.id){
          this.addToForm()
          this._session.refreshUser(this._user)
        }
      },
      error: (error) => {
        console.log(error);
      }
    });
  }
}
