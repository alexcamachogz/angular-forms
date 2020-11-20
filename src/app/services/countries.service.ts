import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { map } from 'rxjs/operators'
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class CountriesService {
  constructor(private http: HttpClient) {}

  getCountries() {
    return this.http.get('https://restcountries.eu/rest/v2/lang/es').pipe(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      map((resp: any[]) => {
        return resp.map((country) => {
          return {
            name: country.name,
            code: country.alpha3Code
          }
        })
      })
    )
  }
}
