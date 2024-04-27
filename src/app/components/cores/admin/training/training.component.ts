import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrganisationHttpService } from 'src/app/services/http/organisation.http.service';
import { TrainingHttpService } from 'src/app/services/http/training.http.service';
import { UserHttpService } from 'src/app/services/http/user.http.service';
import { UserSessionService } from 'src/app/services/session/user-session.service';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.scss'],
})
export class TrainingComponent implements OnInit {


  private _user!: any;

  get Organisation(): any { return this._organisation; }
  private _organisation: any;

  get Trainings(): any[] { return this._trainings; }
  private _trainings: any[] = [];

  private _organisations: any
  get Organisations(): any[] { return this._organisations; }

  constructor(
    private _userHttpService: UserHttpService,
    private _session: UserSessionService,
    private _trainingHttpService : TrainingHttpService,
    private _organisationHttpService : OrganisationHttpService,
    private _router : Router,
  ) { }

  ngOnInit(): void {
    this.getUser();
    this.getAllOrganisation();
  }

  onSelectedOrganisationId(event :any): void {

    this.getTrainings(event.target.value)
    this._organisations.forEach((organisation : any)=> {
      if(organisation.id == event.target.value){
        this._organisation = organisation
      }
    })
  }

  private getUser() {
    this._session.$user.subscribe((user: any) => {
      this._user = user;
      if (this._user.id) {
        //console.log(user)
      }
    })
  }

  private getTrainings(id : any){
    this._trainingHttpService.getByOrganisationId(id).subscribe({
      next: (data: any) => {
        this._trainings = data
        console.log(this._trainings)
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
        console.log(this._organisations)
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  updatetraining(trainingId : any){
    this._router.navigate(['admin-home/update-training/',trainingId])
  }
  deletetraining(trainingId : any){
    this._trainingHttpService.delete(trainingId).subscribe({
      next: (data: any) => {
        this._trainings = data
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  updateorganisation(organisationId : any){
    this._router.navigate(['admin-home/update-organisation/',organisationId])
  }
  deleteorganisation(organisationId : any){
    this._organisationHttpService.delete(organisationId).subscribe({
      next: (data: any) => {
        this._organisations = data
      },
      error: (error) => {
        console.log(error);
      }
    });
  }
 
}
