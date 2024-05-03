import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FTraining } from 'src/app/models/forms/training.form';
import { ImageHttpService } from 'src/app/services/http/image.http.service';
import { OrganisationHttpService } from 'src/app/services/http/organisation.http.service';
import { TrainingHttpService } from 'src/app/services/http/training.http.service';
import { UserSessionService } from 'src/app/services/session/user-session.service';

@Component({
  selector: 'app-form-training',
  templateUrl: './form-training.component.html',
  styleUrls: ['./form-training.component.scss'],
})
export class FormTrainingComponent implements OnInit {
  
  private _organisationId : any
  private _trainingId : any

  selectedFileTraining!: File;
  private _imageTraining : any
  get ImageTraining(): any  { return this._imageTraining; }

  private _id :any
  get Id(): any { return this._id; }

  private _urlSegements : any
  get UrlSegements(): any { return this._urlSegements; }

  private _training : any 
  get Training(): any  { return this._training; }

  private _organisation : any 
  get Organisation(): any  { return this._organisation; }

  get Trainings(): any[] { return this._trainings; }
  private _trainings: any[] = [];

  private _user : any 
  get User(): any  { return this._user; }

  private _trainingToSend : any = {
    id : null,
    name : null,
    description : null,
    isSpeciality : null,
    prerequisId : null,
    organisationId : null,
  }

  private formTraining: FormGroup = FTraining();
  get FormTraining(): FormGroup { return this.formTraining; }
  get Name():any {return this.formTraining.get('name');}
  get IsSpeciality():any {return this.formTraining.get('isSpeciality');}
  get Description():any {return this.formTraining.get('description');}
  get PrerequisId():any {return this.formTraining.get('prerequisId');}
  get OrganisationId():any {return this.formTraining.get('organisationId');}
  get Errors():any{return this.formTraining.errors}

  constructor(
    private route: ActivatedRoute,
    private _session : UserSessionService,
    private _organisationHttpService : OrganisationHttpService,
    private _trainingHttpService : TrainingHttpService,
    private _router : Router,
    private _imageHttpService : ImageHttpService,
    private _sanitizer: DomSanitizer,
  ) {}

  ngOnInit(): void {
  
    this.route.url.subscribe(segments => {
      this._urlSegements = segments[0].path;
      this.getUser()

      if (this._urlSegements === "update-training") {
        this._trainingId = parseInt(segments[1].path)
        this.getTrainingById(this._trainingId)
      }
      if(this._urlSegements === "insert-training"){
        this._organisationId = parseInt(segments[1].path)
        this.getByOrganistationId(this._organisationId)
        this.getOrganisationById(this._organisationId)
      } 
    });
  }

  private getByOrganistationId(id :any){
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

  private getOrganisationById(id : any) {
    this._organisationHttpService.getById(id).subscribe({
      next: (data: any) => {
        this._organisation = data
        // console.log(this._organisation)
      },
      error: (error) => {
        console.log(error);
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

  private getTrainingById(id : any){
    this._trainingHttpService.getById(id).subscribe({
      next : (data :any) =>{
        this._training = data
        // console.log(this._training)
        if(this._training.id){
          this.addToForm()
          this.getImage()
          this.getByOrganistationId(this._training.organisation.id)
          this.getOrganisationById(this._training.organisation.id)
        }
      },
      error : (error) => {
        console.log(error)
      }}) ;
   }
  
  
   private addToForm(){
  
    let form = {
      id : this._training.id,
      name : this._training.name,
      description : this._training.description ,
      isSpeciality : this._training.isSpeciality == true ? "1" : "0",
      prerequisId : this._training.prerequis ? this._training.prerequis.id : 0,
      organisationId : this._training.organisationId,
    }
    // console.log(form)
    this.formTraining.patchValue(form);
  }

  onSelectedTrainingId(event : any) : void {
    this.formTraining.value.prerequisId = event.target.value;
    
  }

  send() {
    // console.log(this.formTraining.value)
    // console.log(this.formTraining.valid)
    if (this.formTraining.valid) {

      this._trainingToSend.name = this.formTraining.value.name,
      this._trainingToSend.description = this.formTraining.value.description,
      this._trainingToSend.prerequisId = this.formTraining.value.prerequisId,
      this._trainingToSend.isSpeciality = this.formTraining.value.isSpeciality == "1" ? true : false,
      this._trainingToSend.organisationId = this._organisation.id


      // console.log(this._trainingToSend)
   
      if (this._urlSegements === "update-training") {
        this._trainingToSend.id = this._training.id
        // console.log('update')
        this._trainingHttpService.update(this._trainingToSend).subscribe({
          next: (data: any) => {
            this._training = data
            this._router.navigate(['admin-home/training'])
          },
          error: (error) => {
            console.log(error);
          }
        });
      }
      else if (this._urlSegements === "insert-training") {
        // console.log('insert')
        this._trainingHttpService.insert(this._trainingToSend).subscribe({
          next: (data: any) => {
            this._training = data
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
    this.selectedFileTraining = event.target.files[0];
    this.addTraining(this._training)
  }

  addTraining(training : any){
    if (!this.selectedFileTraining) {
      console.error('No file selected');
      return;
    }
    const formData = new FormData();
    formData.append('image', this.selectedFileTraining, training.name+training.organisation.name+training.id);

    this._imageHttpService.insert(formData,training.id,"TrainingImage").subscribe({
      next: (data: any) => {
        this.getTrainingById(this._training.id)
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  private getImage(){
    if(this._training.guidImage != ""){
      this._imageHttpService.getImage(this._training.id,"TrainingImage").subscribe(imageData => {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          //this._imageSite = e.target.result;
          this._training.image = this._sanitizer.bypassSecurityTrustResourceUrl(e.target.result);
        }
        reader.readAsDataURL(imageData);
      });
    }
  }
}
