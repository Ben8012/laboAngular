import { FormArray, FormControl, FormGroup, Validators } from "@angular/forms"

export const UserLogin = function () {
    return new FormGroup({
        username: new FormControl(null),
        password: new FormControl(null, [Validators.required, Validators.minLength(4)]),
    })
}

export const AddressForm = function () {
    return new FormGroup({
        street: new FormControl(null),
        number: new FormControl(null),
        country: new FormControl('Belgique')
    })
}

export const UserRegister = function () {
    return new FormGroup({
        username: new FormControl(null),
        password: new FormControl(null),
        addresses: new FormArray([AddressForm()], [Validators.minLength(1)])
    })
}
