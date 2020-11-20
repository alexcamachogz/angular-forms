import { Component } from '@angular/core'
import { NgForm } from '@angular/forms'

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.styl']
})
export class TemplateComponent {
  user = { name: '', last: '', mail: '' }
  constructor() {
    console.log('Constructor')
  }

  // ngOnInit(): void {}

  save(template: NgForm): void {
    console.log(template)
    console.log(template.value)
  }
}
