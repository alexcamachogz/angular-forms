import { Injectable } from '@angular/core'
import { FormControl } from '@angular/forms'

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
}
