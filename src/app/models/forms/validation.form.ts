import { FormControl, FormGroup, Validators } from "@angular/forms"

export const FValidation = function () {
    return new FormGroup({
        certificatDate: new FormControl(null),
        insuranceDate: new FormControl(null),
        level: new FormControl(null),
  
    })
}
