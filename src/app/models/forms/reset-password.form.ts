
import { FormControl, FormGroup, Validators } from "@angular/forms"
import { passwordValidator } from '../../services/CustomValidator/passwordPattern.validator';
import { checkPasswords } from '../../services/CustomValidator/passwordConfirm.validator';


export const FormResetPassword = function (){
    return new FormGroup({
        password : new FormControl(null,[Validators.required, passwordValidator(),Validators.minLength(4),Validators.maxLength(250)]),
        passwdConfirm : new FormControl(null,[Validators.required, passwordValidator(),Validators.minLength(4),Validators.maxLength(250)]),
    },
    [checkPasswords('passwd', 'passwdConfirm')]
    )
   
}