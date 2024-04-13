import { FormControl, FormGroup, Validators } from "@angular/forms"

export const FSite = function () {
    return new FormGroup({
        id : new FormControl(null),
        name: new FormControl(null,[Validators.required, Validators.minLength(3),Validators.maxLength(50)]),
        description: new FormControl(null,[Validators.required, Validators.minLength(3),Validators.maxLength(1000)]),
        compressor: new FormControl(null,[Validators.required]),
        restoration: new FormControl(null,[Validators.required]),
        price : new FormControl(null,[Validators.required]),
        maxDeep : new FormControl(null,[Validators.required]),
        url : new FormControl(null,),
        gps : new FormControl(null,),
    },
   )
}