
import{ AbstractControl, ValidatorFn} from "@angular/forms";
import { validate_cpf } from "js-brasil/dist/src/validate";

 
export function validateCpf(): ValidatorFn {
    return (control: AbstractControl) => {
        const value = control.value;

        if(value == null) {
            return null;
        }

        const isCpf = validate_cpf(value)


        return isCpf ? null : {validateCpf: true}
    }
}