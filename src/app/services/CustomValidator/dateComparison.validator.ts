import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export const dateComparisonValidator: (field1: string, field2: string) => ValidatorFn = (f1, f2) => {
  return (group: AbstractControl): ValidationErrors | null => {
    const field1Ctrl = group.get(f1);
    const field2Ctrl = group.get(f2);

        if(field1Ctrl || field2Ctrl){
            let errors: any = {};
            const today = new Date();
            if (field1Ctrl && field1Ctrl.value) {
            const startDate = new Date(field1Ctrl.value);
            if (startDate.getTime() < today.getTime()){
                errors['start'] = 'le jour de début doit etre supérieur ou égale a ajourd\'hui';
                }
            }
        
            if(field1Ctrl && field1Ctrl.value && field2Ctrl  && field2Ctrl.value )  {
                const endDate = new Date(field2Ctrl.value)
                const startDate = new Date(field1Ctrl.value);
                if(endDate.getTime() <= startDate.getTime()) {
                    errors['end'] = 'le jour de fin doit etre supérieur ou égale au jour de début';
                } 
            ;
            }   
            return errors; // Validation failed
        }
        return null; // Validation successful if one or both fields are empty
    }
    
};
