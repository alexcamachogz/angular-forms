import { Component, OnInit } from '@angular/core'
import { NgForm } from '@angular/forms'
import { CountriesService } from '../../services/countries.service'

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.styl']
})
export class TemplateComponent implements OnInit {
  user = { name: '', last: '', mail: '', country: '' }
  countries = []
  constructor(private countrieService: CountriesService) {}

  ngOnInit(): void {
    this.countrieService.getCountries().subscribe((countries) => {
      this.countries = countries
      this.countries.unshift({
        name: 'Seleccione país',
        code: ''
      })
    })
  }

  save(template: NgForm): void {
    if (template.invalid) {
      Object.values(template.controls).forEach((control) => {
        control.markAsTouched()
      })
      return
    }

    console.log(template.value)
  }
}
