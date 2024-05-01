
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { FSite } from 'src/app/models/forms/site.form';
import { ConvertorsService } from 'src/app/services/helper/convertors.service';
import { ImageHttpService } from 'src/app/services/http/image.http.service';
import { SiteHttpService } from 'src/app/services/http/site.http.service';
import { UserSessionService } from 'src/app/services/session/user-session.service';

@Component({
  selector: 'app-form-site',
  templateUrl: './form-site.component.html',
  styleUrls: ['./form-site.component.scss'],
})
export class FormSiteComponent implements OnInit {

  selectedFileSite!: File;
  private _imageSite : any
  get ImageSite(): any  { return this._imageSite; }

  selectedFilePlan!: File;
  private _planSite : any
  get PlanSite(): any  { return this._planSite}

  private formSite: FormGroup = FSite();
  get FormSite(): FormGroup { return this.formSite; }

  showAddressForm: boolean = false;

  private _id: any

  private _siteToSend : any = {
    id : null,
    name : null,
    creatorId : null,
    adress : null
  }

  private _url: any
  private _urlSegements: any
  get UrlSegements(): any { return this._urlSegements[0].path; }

  private _activateButtons: any
  get ActivateButtons(): any[] { return this._activateButtons; }

  get Name(): any { return this.formSite.get('name'); }
  get Description(): any { return this.formSite.get('description'); }
  get Restoration(): any { return this.formSite.get('restoration'); }
  get Price(): any { return this.formSite.get('price'); }
  get MaxDepp(): any { return this.formSite.get('maxDepp'); }
  get Url(): any { return this.formSite.get('url'); }
  get Gps(): any { return this.formSite.get('gps'); }

  get Errors(): any { return this.formSite.errors }

  private _user!: any
  get User(): any { return this._user; }

  private _site: any
  get Site(): any { return this._site; }

  constructor(
    private route: ActivatedRoute,
    private _session: UserSessionService,
    private _siteHttpService: SiteHttpService,
    private _router: Router,
    private _imageHttpService : ImageHttpService,
    private _sanitizer: DomSanitizer,
    private _convertor : ConvertorsService

  ) {}

  ngOnInit(): void {
    this.route.url.subscribe(segments => {
      this._urlSegements = segments
      this._url = segments.join('/');
      // console.log("L'URL a changé :", this._url);

      this.getUser()
      if (segments.length > 0 && segments[0].path === "update-site") {
        // console.log("URL contient 'update-site'");
        this._id = segments[1].path
        this.getSiteById(this._id)
        this._activateButtons = false
        // console.log(this._id)
      }
    });
  }

  private getUser() {
    this._session.$user.subscribe({
      next: (data: any) => {
        this._user = data
        //console.log(this._user)
        if (this._user.id) {
        }
      },
      error: (error) => {
        console.log(error)
      }
    });
  }

  private getSiteById(id: any) {
    this._siteHttpService.getById(id).subscribe({
      next: (data: any) => {
        this._site = data
        if (this._site.id) {
          this.addToForm()
          this.getImage()
          this.getPlan()
          if (this._site.adress) {
            this.addAddressToForm(this._site.adress)
          }
          else{
            this.formSite.value.adress = null
          }
        }
        // console.log(this._site)
      },
      error: (error) => {
        console.log(error)
      }
    });
  }

  private addToForm() {
    let form = {
      id: this._site.id,
      name: this._site.name,
      description : this._site.description,
      compressor : this._site.compressor == true ? '1' : '0',
      restoration : this._site.restoration == true ? '1' : '0',
      maxDeep : this._site.maxDepp,
      price : this._site.price,
      url : this._site.url,
      gps : this._site.gps,
      creatorId : this._user.id,
    }
    this.formSite.patchValue(form);
    //console.log(this.formSite.value)
  }

  private addAddressToForm(adress: any) {
    this._siteToSend.adress = {
      id: adress.id,
      street: adress.street,
      city: adress.city,
      postCode: adress.postCode,
      number: adress.number,
      country: adress.country
    }
    // console.log(this._siteToSend)
  }

  toggleAddressForm() {
    this.showAddressForm = !this.showAddressForm;
  }

  OutputAdress(adress: any) {
    this.addAddressToForm(adress)
  }

  send() {
    // console.log(this.formSite.value)
    // console.log(this.formSite)
    if (this.formSite.valid) {
      this._siteToSend.name = this.formSite.value.name
      this._siteToSend.description = this.formSite.value.description
      this._siteToSend.creatorId = this._user.id
      this._siteToSend.compressor = this.formSite.value.compressor == "1" ? true : false
      this._siteToSend.restoration = this.formSite.value.restoration == "1" ? true : false
      this._siteToSend.maxDeep = this.formSite.value.maxDeep
      this._siteToSend.price = this.formSite.value.price
      this._siteToSend.url = this.formSite.value.url
      this._siteToSend.gps = this.formSite.value.gps

      // console.log(this._siteToSend)
   
      if (this._urlSegements[0].path === "update-site") {
        this._siteToSend.id = this._site.id
        // console.log('update')
        this._siteHttpService.update(this._siteToSend).subscribe({
          next: (data: any) => {
            this._site = data
            this._router.navigate(['site'])
          },
          error: (error) => {
            console.log(error);
          }
        });
      }
      else if (this._urlSegements[0].path === "insert-site") {
        // console.log('insert')
        this._siteHttpService.insert(this._siteToSend).subscribe({
          next: (data: any) => {
            this._site = data
            this._router.navigate(['site'])
          },
          error: (error) => {
            console.log(error);
          }
        });
      }
    }
  }

  onFileSelectedSite(event :any): void {
    this.selectedFileSite = event.target.files[0];
  }

  onFileSelectedPlan(event :any): void {
    this.selectedFilePlan = event.target.files[0];
  }

  addSite(site : any){
    if (!this.selectedFileSite) {
      console.error('No file selected');
      return;
    }
    const formData = new FormData();
    formData.append('image', this.selectedFileSite, site.name+site.id);

    delete this.formSite.value.image;

    this._imageHttpService.insertSiteImage(formData,site.id).subscribe({
      next: (data: any) => {
        this.getSiteById(this._id)
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  addPlan(site : any){
    if (!this.selectedFilePlan) {
      console.error('No file selected');
      return;
    }
    const formData = new FormData();
    formData.append('plan', this.selectedFilePlan, site.name+site.id);

    delete this.formSite.value.plan;

    this._imageHttpService.insertSitePlan(formData,site.id).subscribe({
      next: (data: any) => {
        this.getSiteById(this._id)
      },
      error: (error) => {
        console.log(error);
      }
    });

    
  }

  private getImage(){
    if(this._site.guidImage != null){
      this._imageHttpService.getSiteImage(this._site.guidImage).subscribe(imageData => {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          //this._imageSite = e.target.result;
          this._imageSite = this._sanitizer.bypassSecurityTrustResourceUrl(e.target.result);
        }
        reader.readAsDataURL(imageData);
      });
    }
  }

  private getPlan(){
    if(this._site.guidMap != null){
      this._imageHttpService.getSiteMap(this._site.guidMap).subscribe(imageData => {
        // console.log(imageData)
        //this._planSite = this._sanitizer.bypassSecurityTrustResourceUrl(URL.createObjectURL(imageData));
        
        const reader = new FileReader();
        reader.onload = (e: any) => {
          //this._planSite = e.target.result
          //this._planSite = this._planSite.replace(',', ',/9j/')
          this._planSite = this._sanitizer.bypassSecurityTrustResourceUrl(e.target.result);
          // console.log(this._planSite)
        }
        reader.readAsDataURL(imageData);
      });
      
    }
  }


}
