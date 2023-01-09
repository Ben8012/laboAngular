
import {AbstractControl, ValidationErrors, ValidatorFn} from '@angular/forms';

export const passwordValidator: () => ValidatorFn = () => {
  return (ctrl: AbstractControl) => {
      const f1Value = ctrl.value;

      let hasNumber = /\d/.test(f1Value);
      let hasUpper = /[A-Z]/.test(f1Value);
      let hasLower = /[a-z]/.test(f1Value);
      let hasSpecial = /[\$\*\=\+]/.test(f1Value);

      const valid = hasNumber && hasUpper && hasLower && hasSpecial
      //&& hasSpecial;
      if (!valid) {
         // return what´s not valid
         let errors: any = {};
         if(!hasNumber) errors['number'] = 'il manque un nombre';
         if(!hasUpper) errors['upper'] = 'il manque une majuscule';
         if(!hasLower) errors['lower'] = 'il manque une minuscule';
         if(!hasSpecial) errors['special'] = 'il manque un carracter spécial compris dans $*=+';
         return errors;
      }
      return null;
    }
  }
