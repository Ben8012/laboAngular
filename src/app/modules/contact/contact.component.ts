import { User } from './../../models/user.model';
import { Component } from '@angular/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent {

  formChange: User[] = [];

  handleFormChange(e : User){
    this.formChange.push(e);
  }

}
