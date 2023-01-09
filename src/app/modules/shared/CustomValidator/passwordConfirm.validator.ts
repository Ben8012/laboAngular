import {AbstractControl, ValidationErrors, ValidatorFn} from '@angular/forms';
import { FRegister } from '../../register/forms/register.form';

export const checkPasswords: (field1: string, field2: string) => ValidatorFn = (f1, f2) => {
  return (group: AbstractControl) => {
    let field1Ctrl = group.get(f1);
    let field2Ctrl = group.get(f2);

    if (field1Ctrl?.value && field2Ctrl?.value) {
      const f1Value = field1Ctrl.value;
      const f2Value = field2Ctrl.value;

      if (f1Value == f2Value) {
        return null;
      }
      else {

        let errors: any = {};
        errors['passwordMatch'] = 'le mot de pass et la confirmation ne sont pas identique';
        return errors
      }
    }
    return null;
  }
}

