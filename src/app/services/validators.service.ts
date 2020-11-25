import { Injectable } from '@angular/core'
import { FormControl, FormGroup } from '@angular/forms'

@Injectable({
  providedIn: 'root'
})
export class ValidatorsService {
  // constructor() { }
  noCamacho(control: FormControl): { [s: string]: boolean } {
    if (control.value?.toLowerCase() === 'camacho') {
      return {
        noCamacho: true
      }
    }

    return null
  }

  shouldBeTheSame(pass1Name: string, pass2Name: string) {
    return (formFroup: FormGroup) => {
      const pass1Control = formFroup.controls[pass1Name]
      const pass2Control = formFroup.controls[pass2Name]

      if (pass1Control.value === pass2Control.value) {
        pass2Control.setErrors(null)
      } else {
        pass2Control.setErrors({ notSame: true })
      }
    }
  }
}
