import { Component } from '@angular/core'
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms'
import { ValidatorsService } from 'src/app/services/validators.service'

@Component({
  selector: 'app-reactive',
  templateUrl: './reactive.component.html',
  styleUrls: ['./reactive.component.styl']
})
export class ReactiveComponent {
  forma: FormGroup
  patt = '[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$'

  constructor(private fb: FormBuilder, private validator: ValidatorsService) {
    this.createForm()
    this.loadData()
    this.createListeners()
  }

  get hobbies(): FormArray {
    return this.forma.get('hobbies') as FormArray
  }

  get nameInvalid(): boolean {
    return this.forma.get('name').invalid && this.forma.get('name').touched
  }

  get lastInvalid(): boolean {
    return this.forma.get('last').invalid && this.forma.get('last').touched
  }

  get mailInvalid(): boolean {
    return this.forma.get('mail').invalid && this.forma.get('mail').touched
  }

  get userInvalid(): boolean {
    return this.forma.get('user').invalid && this.forma.get('user').touched
  }

  get stateInvalid(): boolean {
    return (
      this.forma.get('address.state').invalid &&
      this.forma.get('address.state').touched
    )
  }

  get cityInvalid(): boolean {
    return (
      this.forma.get('address.city').invalid &&
      this.forma.get('address.city').touched
    )
  }

  get pass1Invalid(): boolean {
    return this.forma.get('pass1').invalid && this.forma.get('pass1').touched
  }

  get pass2Invalid(): boolean {
    const pass1 = this.forma.get('pass1').value
    const pass2 = this.forma.get('pass2').value

    return pass1 === pass2 ? false : true
  }

  createForm(): void {
    this.forma = this.fb.group(
      {
        name: ['', [Validators.required, Validators.minLength(4)]],
        last: ['', [Validators.required, this.validator.noCamacho]],
        mail: ['', [Validators.required, Validators.pattern(this.patt)]],
        user: ['', , this.validator.isUser],
        pass1: ['', Validators.required],
        pass2: ['', Validators.required],
        address: this.fb.group({
          state: ['', Validators.required],
          city: ['', Validators.required]
        }),
        hobbies: this.fb.array([])
      },
      {
        validators: this.validator.shouldBeTheSame('pass1', 'pass2')
      }
    )
  }

  addHobbie(): void {
    this.hobbies.push(this.fb.control('', Validators.required))
  }

  deleteHobbie(index: number): void {
    this.hobbies.removeAt(index)
  }

  loadData(): void {
    // this.forma.setValue
    this.forma.reset({
      name: 'Alex',
      last: 'Camachoz',
      mail: 'alex@me.com',
      pass1: 123,
      pass2: 123,
      address: {
        state: 'Jalisco',
        city: 'Zapopan'
      }
    })
  }

  createListeners(): void {
    // this.forma.valueChanges.subscribe((value) => {
    //   console.log(value)
    // })

    // this.forma.statusChanges.subscribe((status) => {
    //   console.log({ status })
    // })

    this.forma.get('name').valueChanges.subscribe(console.log)
  }

  save(): void {
    if (this.forma.invalid) {
      return Object.values(this.forma.controls).forEach((control) => {
        if (control instanceof FormGroup) {
          Object.values(control.controls).forEach((control) =>
            control.markAsTouched()
          )
        } else {
          control.markAsTouched()
        }
      })
    }

    // Posteo de la información

    // Reset datos
    this.forma.reset({
      name: 'no name'
    })
  }
}
