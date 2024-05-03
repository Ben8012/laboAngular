import { FormControl, FormGroup, Validators } from "@angular/forms"

export const FLogin = function () {
    return new FormGroup({
        email: new FormControl('benjaminstercks@gmail.com', [Validators.required]),
        password: new FormControl('Test1234=', [Validators.required]),
        // condition: new FormControl(null, [Validators.requiredTrue]),
    })
}
