import { Component, HostListener, type OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { DeleteEventModelComponent } from 'src/app/components/modals/delete-eventModel/delete-eventModel.component';
import { ImageHttpService } from 'src/app/services/http/image.http.service';
import { SiteHttpService } from 'src/app/services/http/site.http.service';
import { UserHttpService } from 'src/app/services/http/user.http.service';
import { ModalDataService } from 'src/app/services/modal/modal.data.service';
import { ObservableService } from 'src/app/services/observable/observable.service';
import { UserSessionService } from 'src/app/services/session/user-session.service';

@Component({
  selector: 'app-site',
  templateUrl: './site.component.html',
  styleUrls: ['./site.component.scss'],
})
export class SiteComponent implements OnInit {

  private _urlSegements : any
  get UrlSegements(): any { return this._urlSegements; }

  private _sites : any [] = []
  get Sites(): any []  { return this._sites; }

  get User(): any { return this._user; }
  private _user!: any;

  SelectedOption: string = 'Vote'; 
  
  private _imageSite : any
  get ImageSite(): any  { return this._imageSite; }

  private _planSite : any
  get PlanSite(): any  { return this._planSite; }

  get ChargingPageMessage(): any { return this._chargingPageMessage; }
  private _chargingPageMessage: string = "Page en chargement ...";

  private _phoneSize : boolean = false
  get PhoneSize() : boolean {return this._phoneSize}

  @HostListener('window:resize', ['$event'])
  onResize() {
    // console.log('phoneSize: '+this._phoneSize)
    // console.log(window.innerWidth)
    this._phoneSize = window.innerWidth <= 580;
  }

  constructor(
    private _siteHttpService: SiteHttpService,
    private _router : Router,
    private _session: UserSessionService,
    private _modalDataService : ModalDataService,
    public dialog: MatDialog,
    private _imageHttpService : ImageHttpService,
    private _sanitizer: DomSanitizer,
    private route: ActivatedRoute,
    private _observableService : ObservableService
    ) { }

  ngOnInit(): void {
    this._phoneSize = window.innerWidth <= 580
    this.route.url.subscribe(segments => {
      this._urlSegements = segments[0].path
      // console.log(segments)
      this.getUser()
      this.getSites()

    });
    //console.log(this._phoneSize)
 
   }

  //  private getAll(){
  //   this._siteHttpService.getAll().subscribe({
  //     next : (data :any) =>{
  //       this._sites = data

  //       this._sites.forEach((site : any) => {
  //           this.getImages(site)
  //       });
  //       if(this._sites.length == 0){
  //         this._chargingPageMessage ="Vous n'avez pas de site referencé"
  //       }else{
  //         this._chargingPageMessage =""
  //       }
  //     },
  //     error : (error) => {
  //       console.log(error)
  //     }}) ;
  //  }

  //  private getAllSiteAndVote(){
  //   this._siteHttpService.getAllSiteAndVote(this._user.id).subscribe({
  //     next : (data :any) =>{
  //       this._sites = data

  //       this._sites.forEach((site : any) => {  
  //         this.getImages(site)  
  //       });
  //       if(this._sites.length == 0){
  //         this._chargingPageMessage ="Vous n'avez pas de site referencé"
  //       }else{
  //         this._chargingPageMessage =""
  //       }
  //     },
  //     error : (error) => {
  //       console.log(error)
  //     }}) ;
  //  }


   private getUser() {
    this._session.$user.subscribe({
      next : (data :any) =>{
        this._user = data;
        // if(this._user && this._user.id){
        //   this._observableService.getAllSiteAndVote(this._user);
        // }
        // else{
        //   this._observableService.getAllSite()
        // }
        
      },
      error : (error) => {
        console.log(error)
      }}) ;
    }

    private getSites() {
      this._observableService.$sites.subscribe({
        next : (sites :any) =>{
          //console.log(sites)
          if(sites && sites.length > 0){
            this._sites = sites
            this._chargingPageMessage =""
          }
        },
        error : (error) => {
          console.log(error)
        }}) ;
      }
  

  

  
  onOptionChange(id : any) {
    this._siteHttpService.vote(id,this._user.id,this.SelectedOption).subscribe({
      next : (data :any) =>{
        data.forEach((data:any)=> {
          this._sites.forEach((site : any)=> {
            if(site.id == data.id){
              site.avgVote = data.avgVote
              site.userVote = data.userVote
            }
          })
        })
        this.SelectedOption = 'Vote'; 
      },
      error : (error) => {
        console.log(error)
      }}) ;
  }

  deleteSite(event : any){
    this._modalDataService.setData(event);
    document.body.classList.add('modal-open');
    const dialogRef = this.dialog.open(DeleteEventModelComponent);

    dialogRef.afterClosed().subscribe(result => {
      // console.log('Le modal est fermé');
      document.body.classList.remove('modal-open'); 
      this._observableService.getAllSiteAndVote(this._user.id);
    });
   }

   updateSite(event : any){
    this._router.navigate(['update-site',event.id])
  }

  // private getImages(site : any){
  //   if(site.guidImage != null){
  //     this._imageHttpService.getAllowedImage(site.id,"SiteImage").subscribe(imageData => {
  //       const reader = new FileReader();
  //       reader.onload = (e: any) => {
  //         site.image = e.target.result;
  //       }
  //       reader.readAsDataURL(imageData);
  //     });
  //   }
  //   if(site.guidMap != null){
  //     this._imageHttpService.getAllowedImage(site.id,"SitePlan").subscribe(imageData => {
  //       const reader = new FileReader();
  //       reader.onload = (e: any) => {
  //         site.map = this._sanitizer.bypassSecurityTrustResourceUrl(e.target.result);
  //       }
  //       reader.readAsDataURL(imageData);
  //     });
  //   }
  // }
}
