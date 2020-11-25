import { Injectable } from '@angular/core'
import { FormControl, FormGroup } from '@angular/forms'
import { Observable } from 'rxjs'

interface ErrorValidate {
  [s: string]: boolean
}

@Injectable({
  providedIn: 'root'
})
export class ValidatorsService {
  // constructor() { }

  isUser(
    control: FormControl
  ): Promise<ErrorValidate> | Observable<ErrorValidate> {
    if (!control.value) {
      return Promise.resolve(null)
    }
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (control.value === 'syaan') {
          resolve({ exist: true })
        } else {
          resolve(null)
        }
      }, 3500)
    })
  }

  noCamacho(control: FormControl): ErrorValidate {
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
