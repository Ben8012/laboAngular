import { FormControl, FormGroup, Validators } from "@angular/forms"
// [Validators.required, Validators.minLength(3),Validators.maxLength(50)]
export const FEvent = function () {
    return new FormGroup({
        id : new FormControl(null),
        name: new FormControl(null),
        startdate: new FormControl(null),
        enddate: new FormControl(null ),
        diveplaceId: new FormControl(null ),
        trainingId: new FormControl(null),
        clubId: new FormControl(null),
        creatorId: new FormControl(null),
    })
}
