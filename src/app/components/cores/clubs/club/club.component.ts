import { Component, type OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ClubHttpService } from 'src/app/services/http/club.http.service';
import { ModalDataService } from 'src/app/services/modal/modal.data.service';
import { UserSessionService } from 'src/app/services/session/user-session.service';
import { CreatorModalComponent } from '../../../modals/CreatorModal/CreatorModal.component';
import { DateHelperService } from 'src/app/services/helper/date.helper.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DeleteEventModelComponent } from 'src/app/components/modals/delete-eventModel/delete-eventModel.component';
import { ObservableService } from 'src/app/services/observable/observable.service';

@Component({
  selector: 'app-club',
  templateUrl: './club.component.html',
  styleUrls: ['./club.component.scss'],
})
export class ClubComponent implements OnInit {
  private _url :any
  
  private _urlSegements : any
  get UrlSegements(): any { return this._urlSegements[0].path; }

  private _enableButtons :any
  get EnableButtons(): any []  { return this._enableButtons; }

  private _clubs : any [] = []
  get Clubs(): any []  { return this._clubs; }

  get User(): any { return this._user; }
  private _user!: any;

  get ChargingPageMessage(): any { return this._chargingPageMessage; }
  private _chargingPageMessage: string = "Page en chargement ...";
  

  constructor(
    private _clubHttpService: ClubHttpService,
    private _session: UserSessionService,
    private _modalDataService : ModalDataService,
    public dialog: MatDialog,
    private _dateHelperService : DateHelperService,
    private _router : Router,
    private route: ActivatedRoute,
    private _observableService : ObservableService,
    ) { }

  ngOnInit(): void {

    this.route.url.subscribe(segments => {
      this._urlSegements = segments
      this._url = segments.join('/');
      // console.log("L'URL a changé :", this._url);

      this.getUser()

      if (segments.length > 0 && segments[0].path === "club") {
        // console.log("URL contient 'club'");
        this.getAllClubs();
        this._enableButtons = false
      }
    });
   }

  

   getAllClubs(){
    this._observableService.$clubs.subscribe((clubs: any) => {
      // console.log(clubs)
     if(clubs && clubs.length > 0){
        clubs = clubs.filter((event : any) => event.creator.id != this._user.id)
        if(this._user.id){
          this.checkIfParticipe(clubs)
        }
        this._clubs = clubs
        if(clubs.length == 0){
          this._chargingPageMessage ="il n'y a pas de groupes actuellement"
        }else{
          this._chargingPageMessage =""
        }
      }  
    })
    
    // this._clubHttpService.getAll().subscribe({
    //   next : (data :any) =>{
    //     this._clubs = data
    //     this.checkIfParticipe()
    //     this.formatEventForView()  
    //     this.addLevelToView(this._clubs)  
    //     this.addLevelToView(this._clubs)
       
    //     // console.log(this._clubs)
    //     if(this._clubs.length == 0){
    //       this._chargingPageMessage ="Il n'y encore de groupe créer"
    //     }else{
    //       this._chargingPageMessage =""
    //     }
    //   },
    //   error : (error) => {
    //     console.log(error)
    //   }}) ;
   }

   getClubsByUserId(){
    this._observableService.$clubs.subscribe((clubs: any) => {
    //console.log(clubs)
    if(clubs && clubs.length > 0){
      clubs = clubs.filter((event : any) => event.creator.id == this._user.id)
      if(this._user.id){
        this.checkIfParticipe(clubs)
      }
      this._clubs = clubs
      this._chargingPageMessage =""
    }
    else{
      this._chargingPageMessage ="il n'y a pas de goupes actuellement"
    }
    })

    // this._clubHttpService.getClubByUserId(id).subscribe({
    //   next : (data :any) =>{
    //     this._clubs = data
    //     this.checkIfParticipe()
    //     this.formatEventForView()  
    //     this.addLevelToView(this._clubs) 
   
    //     // console.log(this._clubs) 
    //     if(this._clubs.length == 0){
    //       this._chargingPageMessage ="Vous n'avez pas encore créer de groupe"
    //     }else{
    //       this._chargingPageMessage =""
    //     }
    //   },
    //   error : (error) => {
    //     console.log(error)
    //   }}) ;
   }

   private getUser() {
    this._session.$user.subscribe((user: any) => {
      this._user = user;
      if(this._urlSegements.length > 0 && this._urlSegements[0].path === "my-clubs" && this._user.id){
        // console.log("my-clubs")
        this.getClubsByUserId()
        this._enableButtons = true
      }
    })
  }

  
  participe(club : any){
    // console.log(event)
    let participe = false
    club.demands.map((demand : any) => {
      if(demand.id == this._user.id){
        alert("vous avez deja fait une demande")
        participe = true
      }
      else{
        participe = false
      }
    })
    if(!participe){
    club.hiddenButtons = true
    this._clubHttpService.participe(this._user.id,club.id).subscribe({
      next : (data :any) =>{
        this._observableService.getAllClubs()
      },
      error : (error) => {
        console.log(error)
      }}) ;
    }
 }
//  this._chargingPageMessage="Nouvelles données en chargement ..."
 unparticipe(club : any){
  club.hiddenButtons = true
  this._clubHttpService.unParticipe(this._user.id,club.id).subscribe({
    next : (data :any) =>{
      this._observableService.getAllClubs()
      
    },
    error : (error) => {
      console.log(error)
    }}) ;
 }

  creatorInfo(creator : any) :void{
    this._modalDataService.setData(creator);
    document.body.classList.add('modal-open');
    const dialogRef = this.dialog.open(CreatorModalComponent);

    dialogRef.afterClosed().subscribe(result => {
      // console.log('Le modal est fermé');
      document.body.classList.remove('modal-open'); 
    });
   }

   private checkIfParticipe(clubs : any){
    clubs.forEach((club:any) => {
      club.isParticipe = false
      club.participes.forEach((p : any) => {
          if(p.id == this._user.id)
          club.isParticipe = true;
        })
      club.demands.forEach((p : any) => {
        if(p.id == this._user.id)
        club.isParticipe = true;
      })
    });
   }

  updateClub(event : any){
    this._router.navigate(['update-club',event.id])
  }

  deleteClub(club : any){
    this._modalDataService.setData(club);
    document.body.classList.add('modal-open');
    const dialogRef = this.dialog.open(DeleteEventModelComponent);

    dialogRef.afterClosed().subscribe(result => {
      // console.log('Le modal est fermé');
      this._observableService.getAllClubs()
      document.body.classList.remove('modal-open'); 
    });
   }
 
}
