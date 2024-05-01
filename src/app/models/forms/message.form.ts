import { FormControl, FormGroup, Validators } from "@angular/forms"

export const FMessage = function () {
    return new FormGroup({
        senderId: new FormControl(null),
        recieverId: new FormControl(null),
        content: new FormControl(null,[Validators.required,Validators.minLength(1), Validators.maxLength(1000)]),
    })
}
