import { FormUserComponent } from './components/form-user/form-user.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    FormUserComponent,

  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

  ],
  exports:[
    FormsModule,
    FormUserComponent,
  ]
})
export class SharedModule { }
