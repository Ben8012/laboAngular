import { FormControl, FormGroup, Validators } from "@angular/forms"

export const FProfil = function () {
    return new FormGroup({

      firstname: new FormControl(null, [Validators.required, Validators.minLength(3),Validators.maxLength(50)]),
      lastname: new FormControl(null, [Validators.required, Validators.minLength(3),Validators.maxLength(50)]),
      birthdate: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required, Validators.email]),
    })
}
