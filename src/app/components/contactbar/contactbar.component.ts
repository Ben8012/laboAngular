
import { Component } from '@angular/core';
import { IUser } from '../../models/interfaces/user.model';



@Component({
  selector: 'app-contactbar',
  templateUrl: './contactbar.component.html',
  styleUrls: ['./contactbar.component.scss']
})
export class ContactbarComponent {

  contacts : IUser[] | null = null;

  // constructor(private _contactService: ContactService)
  //  {
  //     this.contacts = _contactService.getAllContacts();
  //  }
}
