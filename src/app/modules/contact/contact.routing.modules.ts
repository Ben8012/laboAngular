import { ContactComponent } from './contact.component';
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";


const CONTACT_ROUTES: Routes = [
    {
         path: '', component: ContactComponent
    }
]

@NgModule({
    imports: [RouterModule.forChild(CONTACT_ROUTES)],
    exports: [RouterModule]
})
export class ContactRoutingModule { }
