import { FormControl, FormGroup, Validators } from "@angular/forms"
export const FAdress = function () {
    return new FormGroup({
        id : new FormControl(null),
        street: new FormControl(null,[Validators.required,Validators.minLength(3),Validators.maxLength(50)]),
        number: new FormControl(null, [Validators.required]),
        city : new FormControl(null,[Validators.required,Validators.minLength(3),Validators.maxLength(50)]),
        postCode : new FormControl(null,[Validators.required,Validators.minLength(3),Validators.maxLength(50)]),
        country : new FormControl(null,[Validators.required,Validators.minLength(3),Validators.maxLength(50)]),
    },
   )
}