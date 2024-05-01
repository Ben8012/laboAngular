import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { drawRectangle } from 'pdf-lib';
import { ClubHttpService } from 'src/app/services/http/club.http.service';
import { EventHttpService } from 'src/app/services/http/event.http.servive';
import { UserHttpService } from 'src/app/services/http/user.http.service';
import { UserSessionService } from 'src/app/services/session/user-session.service';

@Component({
  selector: 'app-participator-table',
  templateUrl: './participator-table.component.html',
  styleUrls: ['./participator-table.component.scss'],
})
export class ParticipatorTableComponent implements OnInit {

  @Input() Element: any;
  @Input() User : any
  @Input() UrlSegements : any

  private _participators : any [] = []
  get Participators(): any []  { return this._participators; }

  private _demands : any [] = []
  get Demands(): any []  { return this._demands; }

  get Today(): any { return this._today; }
  private _today: any;


  constructor(
    private _eventHttpService : EventHttpService,
    private _clubHttpService : ClubHttpService,
    private _userHttpService : UserHttpService,
    private _session : UserSessionService
  ) {}

  ngOnInit(): void {
   
    this._today = new Date()
    this._participators = this.Element.participes
    this._demands = this.Element.demands

    this.formatDate(this._participators)
    this.formatDate(this._demands)
    // console.log(this.Element)
    this.checkIfFriend()
  }


  private checkIfFriend(){
    if(this.User.friends){
      this.User.friends.forEach((friend : any) => {
        if(this._participators){
          this._participators.forEach((participator : any)=> {
            if(participator.id == friend.id){
              participator.isUserFriend = true
            }
          })
        }
       if(this._demands){
         this._demands.map((demand : any)=> {
           if(demand.id == friend.id){
             demand.isUserFriend = true
           }
         })
       }
      })
    }
  }

  private formatDate(elements : any){
    elements.forEach((participe : any) => {
      participe.insuranceDateValidation = new Date(participe.insuranceDateValidation)
      participe.medicalDateValidation = new Date(participe.medicalDateValidation)
      participe.birthdate = new Date(participe.birthdate)
      participe.age = this.calculAge(participe.birthdate)
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
            this.addResultToView(data,ElementId)
          },
          error : (error) => {
            console.log(error)
          }}) ;
      }
      if(this.UrlSegements =='my-events' ){
        this._eventHttpService.validationParticipate(participeId,ElementId).subscribe({
          next : (data:any) =>{
            this.addResultToView(data,ElementId)
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
            this.addResultToView(data,ElementId)
          },
          error : (error) => {
            console.log(error)
          }}) ;
      }
      if(this.UrlSegements =='my-events' ){
        this._eventHttpService.unValidationParticipate(participeId,ElementId).subscribe({
          next : (data:any) =>{
            this.addResultToView(data,ElementId)
          },
          error : (error) => {
            console.log(error)
          }}) ;
      }

    }

    private addResultToView(data : any, ElementId : any){
      // console.log(data)
      let element = data.filter((d : any)=>d.id == ElementId)
      this._participators = element[0].participes
      this._demands =  element[0].demands
      if(this._participators){this.formatDate(this._participators)}
      if(this._demands){ this.formatDate(this._demands)}
      // console.log(this._participators)
      // console.log(this._demands)
    }

    like(likedId: number) {
      this._userHttpService.like(this.User.id, likedId).subscribe((data: any[]) => {
        if(this.User && this.User.id){
          this.User = this._session.refreshUser(this.User)
        }
      });
    }
  
 }
