import { FormsModule } from '@angular/forms';
import { ContactRoutingModule } from './contact.routing.modules';
import { ContactComponent } from './contact.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    ContactComponent
  ],
  imports: [
    CommonModule,
    ContactRoutingModule,
    FormsModule
  ],
  exports:[
    ContactComponent
  ]
})
export class ContactModule { }
