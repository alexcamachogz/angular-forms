import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'

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
  }

  ngOnInit(): void {
    console.log('object')
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

  createForm(): void {
    this.forma = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(4)]],
      last: ['', Validators.required],
      mail: ['', [Validators.required, Validators.pattern(this.patt)]],
      address: this.fb.group({
        street: ['', Validators.required],
        city: ['', Validators.required]
      })
    })
  }

  save(): void {
    if (this.forma.invalid) {
      return Object.values(this.forma.controls).forEach((control) => {
        control.markAsTouched()
      })
    }
  }
}
