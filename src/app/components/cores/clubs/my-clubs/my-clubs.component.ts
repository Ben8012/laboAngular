import {Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CreatorModalComponent } from 'src/app/components/modals/CreatorModal/CreatorModal.component';
import { DeleteEventModelComponent } from 'src/app/components/modals/delete-eventModel/delete-eventModel.component';
import { ClubHttpService } from 'src/app/services/http/club.http.service';
import { UserHttpService } from 'src/app/services/http/user.http.service';
import { ModalDataService } from 'src/app/services/modal/modal.data.service';
import { UserSessionService } from 'src/app/services/session/user-session.service';

@Component({
  selector: 'app-my-clubs',
  templateUrl: './my-clubs.component.html',
  styleUrls: ['./my-clubs.component.scss'],
})
export class MyClubsComponent implements OnInit { 
  get User(): any { return this._user; }
  private _user!: any;

  private _clubs : any [] = []
  get Clubs(): any []  { return this._clubs; }

  get Today(): any { return this._today; }
  private _today: any;

  constructor(
    private _clubtHttpService: ClubHttpService,
    private _userHttpService: UserHttpService,
    private _session: UserSessionService,
    private _modalDataService : ModalDataService,
    public dialog: MatDialog,
    private _router : Router,
    ) { }


  ngOnInit(): void {
    this._today = new Date()
    this.getUser() 
  }

  getClubsByUserId(id : any){
    this._clubtHttpService.getClubByUserId(id).subscribe({
      next : (data :any) =>{
        this._clubs = data
        console.log(this._clubs)
        this.checkIfParticipe()
        this._clubs.forEach((club : any) => {
          club.participes.forEach((participe : any) => {
            participe.insuranceDateValidation = new Date(participe.insuranceDateValidation)
            participe.medicalDateValidation = new Date(participe.medicalDateValidation)
          });
          
        });
      },
      error : (error) => {
        console.log(error)
      }}) ;
   }

  private getUser() {
    this._session.$user.subscribe((user: any) => {
      this._user = user;
      //console.log(this._user)
      if(this._user.id){
        console.log(this._user.id)
        this.getClubsByUserId(this._user.id)
      }
    })
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
    
  participe(id : any){
    this._clubtHttpService.participe(this._user.id,id).subscribe({
      next : (data :any) =>{
        this.getClubsByUserId(this._user.id)
      },
      error : (error) => {
        console.log(error)
      }}) ;
 }

 unparticipe(id : any){
  this._clubtHttpService.unParticipe(this._user.id,id).subscribe({
    next : (data :any) =>{
      this.getClubsByUserId(this._user.id)
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

   deleteClub(event : any){
    this._modalDataService.setData(event);
    document.body.classList.add('modal-open');
    const dialogRef = this.dialog.open(DeleteEventModelComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log('Le modal est fermé');
      document.body.classList.remove('modal-open'); 
    });
   }
 





}