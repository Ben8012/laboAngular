import {  Component, OnInit } from '@angular/core';
import { ModalDataService } from 'src/app/services/modal/modal.data.service';
import { MatDialogRef } from '@angular/material/dialog';
import { UserSessionService } from 'src/app/services/session/user-session.service';
import { SiteHttpService } from 'src/app/services/http/site.http.service';

@Component({
  selector: 'diveplace-modal',
  templateUrl: './diveplaceModal.component.html',
  styleUrls: ['./diveplaceModal.component.scss'],
})
export class DiveplaceModalComponent implements OnInit {
  modalData: any;

  private _sites : any [] = []
  get Sites(): any []  { return this._sites; }

  get User(): any { return this._user; }
  private _user!: any;

  SelectedOption: string = ''; 
  

  constructor(
    public dialogRef: MatDialogRef<DiveplaceModalComponent>,
    private _modalDataService: ModalDataService,
    private _session: UserSessionService,
    private _siteHttpService: SiteHttpService,
  ) { }

  ngOnInit(): void {
    this.getUser()
    this.modalData = this._modalDataService.getData();
    // console.log(this.modalData)
  }

  onClose(): void {
    this.dialogRef.close();
  }

  onOptionChange(id : any) {
    this._siteHttpService.vote(id,this._user.id,this.SelectedOption).subscribe({
      next : (data :any) =>{
        this._sites = data
        this._sites.forEach(site =>{
          if(site.id == this.modalData.id){
            this.modalData = site
          }
        })
        //console.log(this._sites)
      },
      error : (error) => {
        console.log(error)
      }}) ;
  }

  private getUser() {
    this._session.$user.subscribe({
      next : (data :any) =>{
        this._user = data;
      },
      error : (error) => {
        console.log(error)
      }}) ;
    }
 }