import { FormControl, FormGroup, Validators } from "@angular/forms"

export const FLogin = function () {
    return new FormGroup({
        email: new FormControl('benjamin@mail.com', [Validators.required]),
        password: new FormControl('Test1234=', [Validators.required])
    })
}
