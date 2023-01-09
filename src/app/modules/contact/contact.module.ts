import { FormsModule } from '@angular/forms';
import { ContactRoutingModule } from './contact.routing.modules';
import { ContactComponent } from './contact.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    ContactComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ContactRoutingModule,
    FormsModule
  ],
  exports:[
    ContactComponent
  ]
})
export class ContactModule { }
