import { FormControl, FormGroup, Validators } from "@angular/forms"

export const FTraining = function () {
    return new FormGroup({
        id : new FormControl(null),
        name: new FormControl(null,[Validators.required, Validators.minLength(3),Validators.maxLength(50)]),
        description: new FormControl(null,[Validators.required, Validators.minLength(3),Validators.maxLength(1000)]),
        isSpeciality : new FormControl(null,[Validators.required]),
        prerequisId: new FormControl(null,),
        organisationId : new FormControl(null),
    },
   )
}