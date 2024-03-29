import { Component, type OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SiteHttpService } from 'src/app/services/http/site.http.service';
import { UserHttpService } from 'src/app/services/http/user.http.service';
import { ModalDataService } from 'src/app/services/modal/modal.data.service';
import { UserSessionService } from 'src/app/services/session/user-session.service';

@Component({
  selector: 'app-site',
  templateUrl: './site.component.html',
  styleUrls: ['./site.component.scss'],
})
export class SiteComponent implements OnInit {

  private _sites : any [] = []
  get Sites(): any []  { return this._sites; }

  get User(): any { return this._user; }
  private _user!: any;

  SelectedOption: string = ''; 
  

  constructor(
    private _siteHttpService: SiteHttpService,
    private _userHttpService: UserHttpService,
    private _session: UserSessionService,
    private _modalDataService : ModalDataService,
    public dialog: MatDialog,
    ) { }

  ngOnInit(): void {
    this.getUser()
   
   }

   getAllSites(){
    this._siteHttpService.getAllSite(this._user.id).subscribe({
      next : (data :any) =>{
        this._sites = data
        //this._sites = this._sites.filter(s => s.training != null)
        console.log(this._sites)
      },
      error : (error) => {
        console.log(error)
      }}) ;
   }

   private getUser() {
    this._session.$user.subscribe({
      next : (data :any) =>{
        this._user = data;
        if(this._user.id){this.getAllSites();}
      },
      error : (error) => {
        console.log(error)
      }}) ;
     
    }
  

  

  
  onOptionChange(id : any) {
    this._siteHttpService.vote(id,this._user.id,this.SelectedOption).subscribe({
      next : (data :any) =>{
        this._sites = data
        //console.log(this._sites)
      },
      error : (error) => {
        console.log(error)
      }}) ;
  }

}
