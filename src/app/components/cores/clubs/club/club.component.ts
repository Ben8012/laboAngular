import { Component, type OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ClubHttpService } from 'src/app/services/http/club.http.service';
import { ModalDataService } from 'src/app/services/modal/modal.data.service';
import { UserSessionService } from 'src/app/services/session/user-session.service';
import { CreatorModalComponent } from '../../../modals/CreatorModal/CreatorModal.component';

@Component({
  selector: 'app-club',
  templateUrl: './club.component.html',
  styleUrls: ['./club.component.scss'],
})
export class ClubComponent implements OnInit {

  private _clubs : any [] = []
  get Clubs(): any []  { return this._clubs; }

  get User(): any { return this._user; }
  private _user!: any;

  constructor(
    private _clubHttpService: ClubHttpService,
    private _session: UserSessionService,
    private _modalDataService : ModalDataService,
    public dialog: MatDialog,
    ) { }

  ngOnInit(): void {
    this.getUser() 
    this.getAllClubs()
   }

   getAllClubs(){
    this._clubHttpService.getAll().subscribe({
      next : (data :any) =>{
        this._clubs = data
        this.checkIfParticipe()
        //this._clubs = this._clubs.filter(c => c.training == null)
        console.log(this._clubs)
      },
      error : (error) => {
        console.log(error)
      }}) ;
   }

   private getUser() {
    this._session.$user.subscribe((user: any) => {
      this._user = user;
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

}
