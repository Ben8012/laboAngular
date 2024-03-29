import { Component, type OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ClubHttpService } from 'src/app/services/http/club.http.service';
import { ModalDataService } from 'src/app/services/modal/modal.data.service';
import { UserSessionService } from 'src/app/services/session/user-session.service';
import { CreatorModalComponent } from '../../../modals/CreatorModal/CreatorModal.component';
import { DateHelperService } from 'src/app/services/helper/date.helper.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DeleteEventModelComponent } from 'src/app/components/modals/delete-eventModel/delete-eventModel.component';

@Component({
  selector: 'app-club',
  templateUrl: './club.component.html',
  styleUrls: ['./club.component.scss'],
})
export class ClubComponent implements OnInit {
  private _url :any
  private _urlSegements : any

  private _enableButtons :any
  get EnableButtons(): any []  { return this._enableButtons; }

  private _clubs : any [] = []
  get Clubs(): any []  { return this._clubs; }

  get User(): any { return this._user; }
  private _user!: any;

  constructor(
    private _clubHttpService: ClubHttpService,
    private _session: UserSessionService,
    private _modalDataService : ModalDataService,
    public dialog: MatDialog,
    private _dateHelperService : DateHelperService,
    private _router : Router,
    private route: ActivatedRoute,
    ) { }

  ngOnInit(): void {

    this.route.url.subscribe(segments => {
      this._urlSegements = segments
      this._url = segments.join('/');
      console.log("L'URL a changé :", this._url);

      this.getUser()

      if (segments.length > 0 && segments[0].path === "club") {
        console.log("URL contient 'club'");
        this.getAllClubs();
        this._enableButtons = false
      }
    });
   }

   formatEventForView(){
    this._clubs.forEach((club : any) => {
      club.createdAt = this._dateHelperService.formatDateToFrench(new Date(club.createdAt))
      club.participes.forEach((participe : any) => {
        participe.insuranceDateValidation = new Date(participe.insuranceDateValidation)
        participe.medicalDateValidation = new Date(participe.medicalDateValidation)
      });
      club.type="club"
      
    });
   }

   getAllClubs(){
    this._clubHttpService.getAll().subscribe({
      next : (data :any) =>{
        this._clubs = data
        this.checkIfParticipe()
        this.formatEventForView()    
        console.log(this._clubs)
      },
      error : (error) => {
        console.log(error)
      }}) ;
   }

   getClubsByUserId(id : any){
    this._clubHttpService.getClubByUserId(id).subscribe({
      next : (data :any) =>{
        this._clubs = data
        this.checkIfParticipe()
        this.formatEventForView()   
        console.log(this._clubs) 
      },
      error : (error) => {
        console.log(error)
      }}) ;
   }

   private getUser() {
    this._session.$user.subscribe((user: any) => {
      this._user = user;
      if(this._urlSegements.length > 0 && this._urlSegements[0].path === "my-clubs" && this._user.id){
        console.log("my-clubs")
        this.getClubsByUserId(this._user.id)
        this._enableButtons = true
      }
    })
  }

  
  participe(id : any){
    this._clubHttpService.participe(this._user.id,id).subscribe({
      next : (data :any) =>{
        this.getAllClubs()
      },
      error : (error) => {
        console.log(error)
      }}) ;
 }

 unparticipe(id : any){
  this._clubHttpService.unParticipe(this._user.id,id).subscribe({
    next : (data :any) =>{
      this.getAllClubs()
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
      console.log('Le modal est fermé');
      document.body.classList.remove('modal-open'); 
    });
   }

   checkIfParticipe(){
    this._clubs.forEach(club => {
      club.isParticipe = false
      club.participes.forEach((p : any) => {
          if(p.id == this._user.id)
          club.isParticipe = true;
        })
    });
   }

  updateClub(event : any){
    this._router.navigate(['update-club',event.id])
  }
  deleteClub(event : any){
    this._modalDataService.setData(event);
    document.body.classList.add('modal-open');
    const dialogRef = this.dialog.open(DeleteEventModelComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log('Le modal est fermé');
      document.body.classList.remove('modal-open'); 
      this.getClubsByUserId(this._user.id)
    });
   }
 

}
