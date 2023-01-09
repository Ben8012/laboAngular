import { User } from './../../../../models/user.model';
import { Component, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AddressForm, UserLogin, UserRegister } from '../../forms/user.form';
import { FormArray } from '@angular/forms';

@Component({
  selector: 'app-form-user',
  templateUrl: './form-user.component.html',
  styleUrls: ['./form-user.component.scss']
})
export class FormUserComponent {
   @Output("formChange")
   formChange = new EventEmitter<User>();

  Form: FormGroup = UserRegister();

  get AddressesField(): FormArray { return this.Form.get('addresses') as FormArray }

  evenFilter(v: number) {
      return v % 2 != 0
  }

  handleLoginAction() {
      if (this.Form.valid) {
          console.log(this.Form.value)
          this.formChange.emit(this.Form.value as User);
      }
  }

  handleAddAddressAction() {
      this.AddressesField.push(AddressForm())

  }

  handleRemoveAddress(index: number) {
      this.AddressesField.removeAt(index);
  }
}
