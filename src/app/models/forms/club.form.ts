import { FormControl, FormGroup, Validators } from "@angular/forms"
import { FAdress } from "./adress.form"

export const FClub = function () {
    return new FormGroup({
        id : new FormControl(null),
        name: new FormControl(null,[Validators.required, Validators.minLength(3),Validators.maxLength(50)]),
        creatorId: new FormControl(null,), 
        adress: FAdress()
    },
   )
}