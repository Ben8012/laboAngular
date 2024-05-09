import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FValidation } from 'src/app/models/forms/validation.form';
import { ImageHttpService } from 'src/app/services/http/image.http.service';
import { TrainingHttpService } from 'src/app/services/http/training.http.service';
import { UserHttpService } from 'src/app/services/http/user.http.service';
import { UserSessionService } from 'src/app/services/session/user-session.service';

@Component({
  selector: 'app-validation',
  templateUrl: './validation.component.html',
  styleUrls: ['./validation.component.scss'],
})
export class ValidationComponent implements OnInit {
  
  private _id: number = 0

  private _urlSegement: any
  get UrlSegement(): any { return this._urlSegement; }
  
  private _user!: any;
  get User(): any { return this._user; }

  private _users!: any;
  get Users(): any { return this._users; }

  private _me!: any;
  get Me(): any { return this._me; }

  private formValidation: FormGroup = FValidation();
  get FormValidation(): FormGroup { return this.formValidation; }
  get CertificatDate():any {return this.formValidation.get('certificatDate');}
  get InsuranceDate():any {return this.formValidation.get('insuranceDate');}
  get Level():any {return this.formValidation.get('level');}

  get ChargingPageMessage(): any { return this._chargingPageMessage; }
  private _chargingPageMessage: string = "Page en chargement ...";

  constructor(
    private route: ActivatedRoute,
    private _userHttpService: UserHttpService,
    private _trainingHttpService : TrainingHttpService,
    private _imageHttpService : ImageHttpService,
    private _session: UserSessionService,
    private _router : Router,
  ) {}

  ngOnInit(): void {
    this.getUser()
    this.route.url.subscribe(segments => {
      this._urlSegement = segments[0].path
      this._id = parseInt(segments[1].path)
      
      // console.log("L'URL a changé :", this._urlSegement);
      // console.log("L'URL a changé :", this._id);

      this.getAllUsers()
      if(this._id){
        //this.getUserToValidate(this._id)
      
      }
      
    });
  }

  private getAllUsers() {
    this._session.$users.subscribe({
      next: (users : any) => {
        if(users && users.length > 0){
          this._users = users
          if(this._id){
            users.forEach((user : any)=>{
              if(user.id == this._id){
                //console.log(user)
                this._user=user
                if(this._user.medicalDateValidation != null){
                  this._user.medicalDateValidation = this._user.medicalDateValidation.substring(0,10)
                }
                if(this._user.insuranceDateValidation != null)
                this._user.insuranceDateValidation = this._user.insuranceDateValidation.substring(0,10)
                this.getImages()
                user.changeAssuranceDate = false
                user.changeCertificatDate = false
                user.changeLevel = false
              }
            })
            if(this._user.id){
            }
          }
        }
        this._chargingPageMessage=""
      },
      error:(data :any) => {
        console.log(data);
      }
    })
  }

  // private getUserToValidate(id : number){
  //   this._userHttpService.getUserById(id).subscribe({
  //     next : (data :any) =>{
  //       this._user = data
  //       // console.log(this._user)
  //       if(this._user.id){
  //         if(this._user.medicalDateValidation != null){
  //           this._user.medicalDateValidation = this._user.medicalDateValidation.substring(0,10)
  //         }
  //         if(this._user.insuranceDateValidation != null)
  //         this._user.insuranceDateValidation = this._user.insuranceDateValidation.substring(0,10)
  //         this.getImages()
  //       }
  //     },
  //     error : (error) => {
  //       console.log(error)
  //     }}) ;
  // }

  private getUser() {
    this._session.$user.subscribe({
      next: (data : any) => {
        this._me = data;
      },
      error:(data :any) => {
        console.log(data);
      }
    })
  }

  

  deletelevel(trainingId : any){
    this._user.changeLevel =true
    this._trainingHttpService.deleteUserTraining(trainingId,this._user.id).subscribe({
      next: (data: any) => {
        //console.log(data)
        this._user.trainings = data
        this._user.changeLevel =false
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  updatelevel(id : any){
    this._trainingHttpService.updateMostLevel(id,this._user.id).subscribe({
      next: (data: any) => {
        this._user.trainings = data
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  private getImages(){
    if(this._user.guidInsurance){
      this._imageHttpService.getImage(this._user.id,"InsuranceImage").subscribe(imageData => {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this._user.imageInsurance = e.target.result;
        }
        reader.readAsDataURL(imageData);
      });
    }
    if(this._user.guidLevel){
      this._imageHttpService.getImage(this._user.id,"LevelImage").subscribe(imageData => {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this._user.imageLevel = e.target.result;
        }
        reader.readAsDataURL(imageData);
      });
    }
    if(this._user.guidCertificat){
      this._imageHttpService.getImage(this._user.id,"CertificatImage").subscribe(imageData => {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this._user.imageCertificat = e.target.result;
        }
        reader.readAsDataURL(imageData);
      });
    }
    if(this._user.guidImage){
      this._imageHttpService.getImage(this._user.id,"ProfilImage").subscribe(imageData => {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this._user.imageProfil = e.target.result;
        }
        reader.readAsDataURL(imageData);
      });
    }
  }

  validation(){
    // console.log(this.formValidation.value)
    // console.log(this.formValidation.valid)
  }

  rotateImage(imageId : string) {
    const image = document.getElementById(imageId) as HTMLImageElement;
    if (image) {
      const rotationAttribute = image.getAttribute('data-rotation');
      const currentRotation = rotationAttribute !== null ? parseFloat(rotationAttribute) : 0;
      const newRotation = currentRotation + 90;
      image.style.transform = `rotate(${newRotation}deg)`;
      image.setAttribute('data-rotation', String(newRotation));
    }
  }

  onSelectedinsuranceDate(event :any):void{
        // console.log(event.target.value)
        this._userHttpService.updateInsuranceDate(event.target.value,this._id).subscribe({
          next: (data: any) => {
            
          },
          error: (error) => {
            console.log(error);
          }
        });
  }

  onSelectedcertificatDate(event :any):void{
    // console.log(event.target.value)
        this._userHttpService.updateCertificatDate(event.target.value,this._id).subscribe({
          next: (data: any) => {
            
          },
          error: (error) => {
            console.log(error);
          }
        });
}

goToMessage(id :any) {
  this._router.navigate(['message/',id])
}

 
}
