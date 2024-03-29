import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-participator-table',
  templateUrl: './participator-table.component.html',
  styleUrls: ['./participator-table.component.scss'],
})
export class ParticipatorTableComponent implements OnInit {

  @Input() Participator: any;
  @Input() User : any

  private _participators : any [] = []
  get Participators(): any []  { return this._participators; }

  get Today(): any { return this._today; }
  private _today: any;


  constructor() {
   
    
  }

  ngOnInit(): void {
    this._today = new Date()
    this._participators = this.Participator
    this.addDates()
  }


  private addDates(){
    this._participators.forEach((participe : any) => {
      participe.insuranceDateValidation = new Date(participe.insuranceDateValidation)
      participe.medicalDateValidation = new Date(participe.medicalDateValidation)
      participe.birthdate = new Date(participe.birthdate)
      participe.age = this.calculAge(participe.birthdate)
    });
  }

  private calculAge(dateNaissance : any) {
    var dateActuelle = new Date();
    var anneeActuelle = dateActuelle.getFullYear();
    var moisActuel = dateActuelle.getMonth() + 1;
    var jourActuel = dateActuelle.getDate();

    var anneeNaissance = dateNaissance.getFullYear();
    var moisNaissance = dateNaissance.getMonth() + 1;
    var jourNaissance = dateNaissance.getDate();

    var age = anneeActuelle - anneeNaissance;

    // Vérifier si l'anniversaire est déjà passé cette année
    if (moisActuel < moisNaissance || (moisActuel === moisNaissance && jourActuel < jourNaissance)) {
        age--;
    }

    return age;
    }
  
 }
