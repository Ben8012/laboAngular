import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { ClubHttpService } from 'src/app/services/http/club.http.service';
import { EventHttpService } from 'src/app/services/http/event.http.servive';

@Component({
  selector: 'app-participator-table',
  templateUrl: './participator-table.component.html',
  styleUrls: ['./participator-table.component.scss'],
})
export class ParticipatorTableComponent implements OnInit {

  @Input() Element: any;
  @Input() User : any
  @Input() UrlSegements : any

  private _element : any

  private _participators : any [] = []
  get Participators(): any []  { return this._participators; }

  private _demands : any [] = []
  get Demands(): any []  { return this._demands; }

  get Today(): any { return this._today; }
  private _today: any;


  constructor(
    private _eventHttpService : EventHttpService,
    private _clubHttpService : ClubHttpService
  ) {}

  ngOnInit(): void {
    this._today = new Date()
    this._participators = this.Element.participes
    this._demands = this.Element.demands

    this.addDatesToParticipators()
    this.addDatesToDemands()

 
  }




  private addDatesToParticipators(){
    this._participators.forEach((participe : any) => {
      participe.insuranceDateValidation = new Date(participe.insuranceDateValidation)
      participe.medicalDateValidation = new Date(participe.medicalDateValidation)
      participe.birthdate = new Date(participe.birthdate)
      participe.age = this.calculAge(participe.birthdate)
    });
  }

  private addDatesToDemands(){
    this._demands.forEach((demand : any) => {
      demand.insuranceDateValidation = new Date(demand.insuranceDateValidation)
      demand.medicalDateValidation = new Date(demand.medicalDateValidation)
      demand.birthdate = new Date(demand.birthdate)
      demand.age = this.calculAge(demand.birthdate)
    });
  }

  private calculAge(dateNaissance : any) {
    var dateActuelle = new Date();
    var anneeActuelle = dateActuelle.getFullYear();
    var moisActuel = dateActuelle.getMonth() + 1;
    var jourActuel = dateActuelle.getDate();

    var anneeNaissance = dateNaissance.getFullYear();
    var moisNaissance = dateNaissance.getMonth() + 1;
    var jourNaissance = dateNaissance.getDate();

    var age = anneeActuelle - anneeNaissance;

    // Vérifier si l'anniversaire est déjà passé cette année
    if (moisActuel < moisNaissance || (moisActuel === moisNaissance && jourActuel < jourNaissance)) {
        age--;
    }

    return age;
    }
  
    add(participeId: any,ElementId : any){
      if(this.UrlSegements =='my-clubs' ){
        this._clubHttpService.validationParticipate(participeId,ElementId).subscribe({
          next : (data:any) =>{
            this._participators = data.participes
            this._demands = data.demands
          },
          error : (error) => {
            console.log(error)
          }}) ;
      }
      if(this.UrlSegements =='my-events' ){
        this._eventHttpService.validationParticipate(participeId,ElementId).subscribe({
          next : (data:any) =>{
            this._participators = data.participes
            this._demands = data.demands
          },
          error : (error) => {
            console.log(error)
          }}) ;
      }

    }

    erase(participeId: any,ElementId : any){
      if(this.UrlSegements =='my-clubs' ){
        this._clubHttpService.unValidationParticipate(participeId,ElementId).subscribe({
          next : (data:any) =>{
            this._participators = data.participes
            this._demands = data.demands
          },
          error : (error) => {
            console.log(error)
          }}) ;
      }
      if(this.UrlSegements =='my-events' ){
        this._eventHttpService.unValidationParticipate(participeId,ElementId).subscribe({
          next : (data:any) =>{
            this._participators = data.participes
            this._demands = data.demands
          },
          error : (error) => {
            console.log(error)
          }}) ;
      }
    }
 }
