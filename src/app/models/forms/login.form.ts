import { FormControl, FormGroup, Validators } from "@angular/forms"

export const FLogin = function () {
    return new FormGroup({
        email: new FormControl(null, [Validators.required]),
        password: new FormControl(null, [Validators.required])
    })
}
