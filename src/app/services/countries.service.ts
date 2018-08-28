import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { HelperService } from './helper.service';
import { Subject, Observable } from 'rxjs';
import { Country } from '../models/country.interface';

@Injectable({
  providedIn: 'root'
})
export class CountriesService {

  constructor(private apiService: ApiService) { }

  /**
   * Get countries from API
   * @returns {Observable<Country[]>}
   */
  public getCountries(): Observable<Country[]> {
    const subject = new Subject<any>();
    this.apiService.httpGet('/countries')
      .subscribe(
        (data: any) => {
          subject.next(data);
        },
        (err: any) => {
          subject.error(err);
        }
      )
    return subject.asObservable();
  }
}
