import { Component, OnInit } from '@angular/core'
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms'

@Component({
  selector: 'app-reactive',
  templateUrl: './reactive.component.html',
  styleUrls: ['./reactive.component.styl']
})
export class ReactiveComponent implements OnInit {
  forma: FormGroup
  patt = '[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$'

  constructor(private fb: FormBuilder) {
    this.createForm()
    this.loadData()
  }

  ngOnInit(): void {
    console.log('object')
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

  createForm(): void {
    this.forma = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(4)]],
      last: ['', Validators.required],
      mail: ['', [Validators.required, Validators.pattern(this.patt)]],
      address: this.fb.group({
        state: ['', Validators.required],
        city: ['', Validators.required]
      }),
      hobbies: this.fb.array([])
    })
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
      last: 'Camacho',
      mail: 'alex@me.com',
      address: {
        state: 'Jalisco',
        city: 'Zapopan'
      }
    })
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
