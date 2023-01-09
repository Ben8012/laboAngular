import { Adress } from './../../../models/adress.model';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { passwordValidator } from '../../shared/CustomValidator/passwordPattern.validator';
import { checkPasswords } from './../../shared/CustomValidator/passwordConfirm.validator';

export const FRegister = function () {
    return new FormGroup({
        firstname: new FormControl(null, [Validators.required, Validators.minLength(4),Validators.maxLength(50)]),
        lastname: new FormControl(null, [Validators.required, Validators.minLength(4),Validators.maxLength(50)]),
        birthdate: new FormControl(null, [Validators.required]),
        email: new FormControl(null, [Validators.required, Validators.email]),
        password: new FormControl(null, [Validators.required, Validators.minLength(4),Validators.maxLength(250), passwordValidator()]),
        passwordConfirm: new FormControl(null, [Validators.required, passwordValidator()]),
        phone : new FormControl(null,),
        

    },
     [checkPasswords('password', 'passwordConfirm')]
    )
}


