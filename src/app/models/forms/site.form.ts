import { FormControl, FormGroup, Validators } from "@angular/forms"

export const FSite = function () {
    return new FormGroup({
        id : new FormControl(null),
        name: new FormControl(null,[Validators.required, Validators.minLength(3),Validators.maxLength(50)]),
        description: new FormControl(null,[Validators.required, Validators.minLength(3),Validators.maxLength(1000)]),
        compressor: new FormControl(null,[Validators.required, Validators.minLength(3),Validators.maxLength(1000)]),
        restoration: new FormControl(null,),
        price : new FormControl(null),
        maxDeep : new FormControl(null),
        url : new FormControl(null,[ Validators.minLength(3),Validators.maxLength(50)]),
        gps : new FormControl(null,[ Validators.minLength(3),Validators.maxLength(50)]),
    },
   )
}