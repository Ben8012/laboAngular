import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IUser } from 'src/app/models/interfaces/user.model';
import { UserHttpService } from '../http/user.http.service';
import { UserSessionService } from '../session/user-session.service';
import { EventHttpService } from '../http/event.http.servive';
import { ImageHttpService } from '../http/image.http.service';
import { DateHelperService } from '../helper/date.helper.service';
import { ClubHttpService } from '../http/club.http.service';
import { SiteHttpService } from '../http/site.http.service';
import { DomSanitizer } from '@angular/platform-browser';
import { ChatService } from '../http/chat.http.service';

@Injectable({
  providedIn: 'root'
})
export class ObservableService implements OnInit {

  public $events: BehaviorSubject<any> = new BehaviorSubject( {} as any);
  public $clubs: BehaviorSubject<any> = new BehaviorSubject( {} as any);
  public $sites: BehaviorSubject<any> = new BehaviorSubject( {} as any);
  public $messages: BehaviorSubject<any> = new BehaviorSubject( {} as any);

  private _user! : any

  constructor(
    private _eventHttpService: EventHttpService,
    private _imageHttpService : ImageHttpService,
    private _dateHelperService : DateHelperService,
    private _clubHttpService : ClubHttpService,
    private _siteHttpService : SiteHttpService,
    private _sanitizer: DomSanitizer,
    private _session : UserSessionService,
    private _chatService : ChatService
  ) {}

  ngOnInit(): void {
  }


  saveEvents(friend: any) {
    this.$events.next(friend);
  }

  clearEvents(){
    this.$events.next({} as any)
  }

  saveClubs(friend: any) {
    this.$clubs.next(friend);
  }

  clearClubs(){
    this.$clubs.next({} as any)
  }

  saveSites(friend: any) {
    this.$sites.next(friend);
  }

  clearSites(){
    this.$sites.next({} as any)
  }

  clearMessages(){
    this.$messages.next({} as any)
  }

  saveMessages(friend: any) {
    this.$messages.next(friend);
  }

  getAllEvents(){
    this._eventHttpService.getAllEvent().subscribe({
      next : (events :any) =>{  
        //console.log(events)
        this.formatEventForView(events)
        this.addLevelToView(events) 
        this.saveEvents(events)
        console.log('events chargés')
      },
      error : (error) => {
        console.log(error)
      }}) ;
   }

   getAllClubs(){
    this._clubHttpService.getAll().subscribe({
      next : (clubs :any) =>{
        //console.log(clubs)
        this.formatClubForView(clubs)  
        this.addLevelToView(clubs)  
        this.saveClubs(clubs)
        console.log('clubs chargés')
      },
      error : (error) => {
        console.log(error)
      }}) ;
   }

   getAllSiteAndVote(user : any){
    this._siteHttpService.getAllSiteAndVote(user.id).subscribe({
      next : (data :any) =>{
        if(data && data.length > 0){
          data.forEach((site : any) => {  
            this.getImages(site)  
          });
          this.saveSites(data)
          console.log('sites chargés')
        }
      },
      error : (error) => {
        console.log(error)
      }}) ;
   }

   getAllSite(){
    this._siteHttpService.getAll().subscribe({
      next : (data :any) =>{
        if(data && data.length > 0){
          data.forEach((site : any) => {
              this.getImages(site)
          });
          this.saveSites(data)
          console.log('sites chargés')
        }
      },
      error : (error) => {
        console.log(error)
      }}) ;
   }

   private formatEventForView(events :any){
    events.forEach((event : any) => {
      event.startDateFrench = this._dateHelperService.formatDateToFrench(new Date(event.startDate))
      event.endDateFrench = this._dateHelperService.formatDateToFrench(new Date(event.endDate))
      event.participes.forEach((participe : any) => {
        participe.hiddenButtons = false
        participe.insuranceDateValidation = new Date(participe.insuranceDateValidation)
        participe.medicalDateValidation = new Date(participe.medicalDateValidation)
      });
      event.demands.forEach((demand : any) => {
        demand.hiddenButtons = false
        demand.insuranceDateValidation = new Date(demand.insuranceDateValidation)
        demand.medicalDateValidation = new Date(demand.medicalDateValidation)
      });
      event.startDate = new Date(event.startDate)
      event.endDate = new Date(event.endDate)
      event.type = "event"
      event.chargingMessage=""
      event.hiddenButtons = false
      
      if(event.diveplace.guidImage != null){
        this._imageHttpService.getAllowedImage(event.diveplace.id,"SiteImage").subscribe(imageData => {
          const reader = new FileReader();
          reader.onload = (e: any) => {
            event.diveplace.image = e.target.result;
          }
          reader.readAsDataURL(imageData);
        });
      }
      
      
    });
   }

   formatClubForView(clubs : any){
    clubs.forEach((club : any) => {
      club.createdAt = this._dateHelperService.formatDateToFrench(new Date(club.createdAt))
      club.participes.forEach((participe : any) => {
        club.hiddenButtons = false
        participe.insuranceDateValidation = new Date(participe.insuranceDateValidation)
        participe.medicalDateValidation = new Date(participe.medicalDateValidation)
      });
      club.type="club"
      club.chargingMessage=""
      club.hiddenButtons = false
      
    });
   }

   private addLevelToView(events :any){
    events.forEach((event : any) => {
      event.creator.trainings.forEach((training : any) =>{
        if(training.isMostLevel == true){
          event.creator.level = training.name
          event.creator.organisation = training.organisation.name
        }
      });
      this.addMostLevel(event.creator.friends)
      this.addMostLevel(event.creator.likeds)
      this.addMostLevel(event.creator.likers)
    });
   }

   private addMostLevel(elements :any){
    elements.map((element : any) => {
      element.trainings.map((training : any)=>{
        if(training.isMostLevel ==  true){
          element.level = training.name
          element.organisation = training.organisation.name
        }
      })
    });
   }

   private getImages(site : any){
    if(site.guidImage != null){
      this._imageHttpService.getAllowedImage(site.id,"SiteImage").subscribe(imageData => {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          site.image = this._sanitizer.bypassSecurityTrustResourceUrl(e.target.result);
        }
        reader.readAsDataURL(imageData);
      });
    }
    if(site.guidMap != null){
      this._imageHttpService.getAllowedImage(site.id,"SitePlan").subscribe(imageData => {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          site.map = this._sanitizer.bypassSecurityTrustResourceUrl(e.target.result);
        }
        reader.readAsDataURL(imageData);
      });
    }
  }

  refreshViews():void{
    this.getUser()
    this.getAllClubs()
    this.getAllEvents()
    if(this._user.id){
      this.getAllSiteAndVote(this._user)
      //this._session.refreshUser(this._user)
      this._session.getAllUsers()
      this._chatService.connection()
    }else{
      this.getAllSite()
    }
  }

  private getUser(){
    this._session.$user.subscribe({
      next: (data : any) => {
          this._user = data;
          // if (this._user.value && Object.keys(this._user.value).length === 0) {
          //   console.log("Le BehaviorSubject est vide !");
          // } else {
          //   console.log("Le BehaviorSubject n'est pas vide !");
          // }
      },
      error:(data :any) => {
        console.log(data);
      }
    })
  }

}
