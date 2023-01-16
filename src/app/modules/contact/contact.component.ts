import { IUser } from '../../models/interfaces/user.model';
import { Component } from '@angular/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent {

  formChange: IUser[] = [];

  handleFormChange(e : IUser){
    this.formChange.push(e);
  }

}
