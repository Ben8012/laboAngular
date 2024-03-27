import { FormControl, FormGroup, Validators } from "@angular/forms"
import { dateComparisonValidator } from "src/app/services/CustomValidator/dateComparison.validator"
// [Validators.required, Validators.minLength(3),Validators.maxLength(50)]
export const FEvent = function () {
    return new FormGroup({
        id : new FormControl(null),
        name: new FormControl(null,[Validators.required, Validators.minLength(3),Validators.maxLength(50)]),
        startdate: new FormControl(null,[Validators.required]),
        enddate: new FormControl(null,[Validators.required]),
        diveplaceId: new FormControl(null,[Validators.required] ),
        trainingId: new FormControl(null),
        clubId: new FormControl(null),
        creatorId: new FormControl(null,[Validators.required]),
    },
    [ dateComparisonValidator('startdate', 'enddate') ]
   )
}