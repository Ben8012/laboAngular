
import { FormControl, FormGroup, Validators } from "@angular/forms"

export const FDivelog = function () {
    return new FormGroup({
        id : new FormControl(null),
        description: new FormControl(null),
        duration: new FormControl(null,[Validators.required] ),
        maxDeep: new FormControl(null,[Validators.required],),
        airTemperature: new FormControl(null),
        waterTemperature: new FormControl(null),
        eventId: new FormControl(null),
        userId: new FormControl(null),
    },
    )
}