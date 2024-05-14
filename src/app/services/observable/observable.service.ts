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
import { TrainingHttpService } from '../http/training.http.service';
import { DivelogHttpService } from '../http/divelog.http.service';

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
    private _chatService : ChatService,
    private _userHttpService : UserHttpService,
    private _trainngHttpService : TrainingHttpService,
    private _divelogHttpService : DivelogHttpService
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

  async getAllEvents(){
    this._eventHttpService.getAllEvent().subscribe({
      next : async (events :any) =>{  
        //console.log(events)
        if(events && events.length > 0){
          // if(await this.getAllEventsInfos(events)){
          //   this.formatEventForView(events)
          //   this.addLevelToView(events) 
          //   this.saveEvents(events)
          //   console.log(events)
          //   console.log('events chargés')

          // }
          this.formatEventForView(events)
            this.addLevelToView(events) 
            this.saveEvents(events)
            //console.log(events)
            console.log('events chargés')
        }
        
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
    //console.log(events)
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


  // private getAllEventsInfos(events : any){
  //   let diveplaceok = false
  //   let clubeok = false
  //   let creatorok = false
  //   let trainingok = false
  //   let prerequisok = false
  //   let participetrainingsok = false
  //   let demandtrainingsok = false

  //   events.forEach((e:any)=> {
  //     console.log(e)

  //     if(e.diveplaceId == 0) {
  //       e.diveplace = null
  //     }else{
  //       this._siteHttpService.getById(e.diveplaceId).subscribe({
  //         next: (diveplace : any) => {
  //           e.diveplace = diveplace;
  //           diveplaceok = true
  //         },
  //         error:(data :any) => {
  //           console.log(data);
  //         }
  //       })
  //     }

  //     if(e.clubId == 0) {
  //       e.club = null
  //     }else{
  //       this._clubHttpService.getClubById(e.clubId).subscribe({
  //         next: (club : any) => {
  //           e.club = club;
  //           clubeok = true
  //         },
  //         error:(data :any) => {
  //           console.log(data);
  //         }
  //       })
  //     }

  //     if(e.creatorId == 0) {
  //       e.creator = null
  //     }else{
  //       this._userHttpService.getUserById(e.creatorId).subscribe({
  //         next: (user : any) => {
  //           e.creator = user;
  //           creatorok = true
  //         },
  //         error:(data :any) => {
  //           console.log(data);
  //         }
  //       })
  //     }

  //     if(e.trainingId == 0) {
  //       e.training = null
  //     }else{
  //       this._trainngHttpService.getById(e.trainingId).subscribe({
  //         next: (training : any) => {
  //           e.training = training;
  //           trainingok = false
  //         },
  //         error:(data :any) => {
  //           console.log(data);
  //         }
  //       })
  //     }

  //     if(e.traning != null){
  //       if(e.traning.PrerequisiteId == 0) {
  //         e.traning.PrerequisiteId = null
  //       }else{
  //         this._trainngHttpService.getById(e.traning.PrerequisiteId).subscribe({
  //           next: (training : any) => {
  //             e.training.prerequis = training;
  //             prerequisok = true
  //           },
  //           error:(data :any) => {
  //             console.log(data);
  //           }
  //         })
  //       }
  //     }

  //     this._eventHttpService.getAllParticipeByEventId(e.id).subscribe({
  //       next: (participes : any) => {
  //         e.participes = participes;
  //         e.participes.forEach((participe : any)=> {
  //           this._trainngHttpService.getTrainingsByUserId(participe.id).subscribe({
  //             next: (trainings : any) => {
  //               participe.trainings = trainings;
  //               participetrainingsok = true
  //             },
  //             error:(data :any) => {
  //               console.log(data);
  //             }
  //           })
  //         })
  //       },
  //       error:(data :any) => {
  //         console.log(data);
  //       }
  //     })
      
  //     this._eventHttpService.getAllDemandsByEventId(e.id).subscribe({
  //       next: (demands : any) => {
  //         e.demands = demands;
  //         e.demands.forEach((demand : any)=> {
  //           this._trainngHttpService.getTrainingsByUserId(demand.id).subscribe({
  //             next: (trainings : any) => {
  //               demand.trainings = trainings;
  //               demandtrainingsok = true
  //             },
  //             error:(data :any) => {
  //               console.log(data);
  //             }
  //           })
  //         })
  //       },
  //       error:(data :any) => {
  //         console.log(data);
  //       }
  //     })
  //     console.log(e)
  //   })

  //   return diveplaceok && clubeok && creatorok && trainingok && prerequisok && participetrainingsok && demandtrainingsok 
  // }

  private async getAllEventsInfos(events : any ) {
    try {
        let promises : any = [];

        events.forEach((e:any) => {
            promises.push(this.loadEventData(e));
        });

        await Promise.all(promises);

        return true; // Toutes les données ont été chargées avec succès
    } catch (error) {
        console.error('An error occurred while loading event data:', error);
        return false; // Une erreur s'est produite lors du chargement des données
    }
}

private async loadEventData(event : any) {
    try {
        // Charger les données supplémentaires pour l'événement
        await this.loadDivePlace(event);
        await this.loadClub(event);
        await this.loadCreator(event);
        await this.loadTraining(event);
        await this.loadParticipes(event);
        await this.loadDemands(event);
        await this.loadDivelog(event);
    } catch (error) {
        console.error('An error occurred while loading event data:', error);
        throw error;
    }
}

private async loadDivePlace(event :any) {
    if (event.diveplaceId !== 0) {
        event.diveplace = await this._siteHttpService.getById(event.diveplaceId).toPromise();
    } else {
        event.diveplace = null;
    }
}

private async loadClub(event :any) {
  if (event.clubId !== 0) {
      event.club = await this._clubHttpService.getClubById(event.clubId).toPromise();
  } else {
      event.club = null;
  }
}

private async loadCreator(event :any) {
  if (event.creatorId !== 0) {
      event.creator = await this._userHttpService.getUserById(event.creatorId).toPromise();
  } else {
      event.creator = null;
  }
}

private async loadTraining(event :any) {
  if (event.trainingId !== 0) {
      event.training = await this._trainngHttpService.getById(event.trainingId).toPromise();
  } else {
      event.training = null;
  }
}

private async loadDivelog(event :any) {
  if (event.id !== 0) {
      event.divelog = await this._divelogHttpService.getDivelogByEventId(event.id).toPromise();
  } else {
      event.divelog = null;
  }
}


private async loadParticipes(event :any) {
    event.participes = await this._eventHttpService.getAllParticipeByEventId(event.id).toPromise();
    console.log(event.participes)
    // Charger les données supplémentaires pour chaque participe
    await Promise.all(event.participes.map(async (participe :any) => {
        participe.trainings = await this._trainngHttpService.getTrainingsByUserId(participe.id).toPromise();
    }));
}

private async loadDemands(event :any) {
  event.demands = await this._eventHttpService.getAllDemandsByEventId(event.id).toPromise();
  // Charger les données supplémentaires pour chaque participe
  await Promise.all(event.demands.map(async (demand :any) => {
    demand.trainings = await this._trainngHttpService.getTrainingsByUserId(demand.id).toPromise();
  }));
}



}
