import { FormControl, FormGroup, Validators } from "@angular/forms"

export const Flevel = function () {
    return new FormGroup({
        id : new FormControl(null),
        refNumber: new FormControl(null),
        trainingId : new FormControl(null,[Validators.required]),
        userId : new FormControl(null,[Validators.required])
    },
   )
}