import { FormControl, FormGroup, Validators } from "@angular/forms"

export const FMessage = function () {
    return new FormGroup({
        senderId: new FormControl(''),
        recieverId: new FormControl(''),
        content: new FormControl('',[Validators.required,Validators.minLength(1), Validators.maxLength(1000)]),
    })
}
