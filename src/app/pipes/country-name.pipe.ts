import { Pipe, PipeTransform } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Subject, Observable } from 'rxjs';
import { Country } from '../models/country.interface';

@Pipe({
  name: 'countryName'
})
export class CountryNamePipe implements PipeTransform {

  constructor(private apiService: ApiService) { }

  /**
   * Function that transform an id to string
   * @param id from country
   * @returns {string}
   */
  transform(id: number): string {
    const countries = this.getCountries();
    const country = countries.filter((country) => {
      return country.id == id;
    })
    if (country.length) {
      return country[0].name;
    } else {
      return String(id);
    }
  }

  /**
   * Get list of countries from API
   * @returns {Array<Country>}
   */
  public getCountries(): Array<Country> {
    return JSON.parse(localStorage.getItem('countries'));
  }

}
