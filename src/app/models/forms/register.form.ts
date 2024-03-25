import { Adress } from '../interfaces/adress.model';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { passwordValidator } from '../../services/CustomValidator/passwordPattern.validator';
import { checkPasswords } from '../../services/CustomValidator/passwordConfirm.validator';

export const FRegister = function () {
    return new FormGroup({
        firstname: new FormControl('test', [Validators.required, Validators.minLength(3),Validators.maxLength(50)]),
        lastname: new FormControl('test', [Validators.required, Validators.minLength(3),Validators.maxLength(50)]),
        birthdate: new FormControl('1980-12-10', [Validators.required]),
        email: new FormControl('test@mail.be', [Validators.required, Validators.email]),
        password: new FormControl('Test1234=', [Validators.required, Validators.minLength(4),Validators.maxLength(250), passwordValidator()]),
        passwordConfirm: new FormControl('Test1234=', [Validators.required, passwordValidator()]),
        phone : new FormControl('0465/123456',),


    },
     [checkPasswords('password', 'passwordConfirm')]
    )
}


