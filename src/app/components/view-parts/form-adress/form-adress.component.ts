import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FAdress } from 'src/app/models/forms/adress.form';

@Component({
  selector: 'app-form-adress',
  templateUrl: './form-adress.component.html',
  styleUrls: ['./form-adress.component.scss'],
})
export class FormAdressComponent implements OnInit {

  @Output() AddressAdded = new EventEmitter<any>();
  @Input() Adress : any
 

  private formAdress: FormGroup = FAdress();
  get FormAdress(): FormGroup { return this.formAdress; }

  get Street():any {return this.formAdress.get('street')}
  get Number():any {return this.formAdress.get('number')}
  get City():any {return this.formAdress.get('city')}
  get PostCode():any {return this.formAdress.get('postCode')}
  get Country():any {return this.formAdress.get('country')}


  constructor(
    
  ) {}

  ngOnInit(): void {
    this.formAdress.patchValue(this.Adress)
  } 

  sendForm() {
    if(this.formAdress.valid){
      this.AddressAdded.emit(this.formAdress.value);
    }
  }
}
