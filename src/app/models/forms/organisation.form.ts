import { FormControl, FormGroup, Validators } from "@angular/forms"

export const FOrganisation = function () {
    return new FormGroup({
        id : new FormControl(null),
        name: new FormControl(null,[Validators.required, Validators.minLength(3),Validators.maxLength(50)]),
    },
   )
}