import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { HelperService } from './helper.service';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CountriesService {

  constructor(private apiService: ApiService) { }

  public getCountries() {
    const subject = new Subject<any>();
    this.apiService.httpGetCountriesList('/countries')
      .subscribe(
        (data: any) => {
        //   console.log(data);
        //   debugger
          // console.log(JSON.stringify(data))
          // const countries = HelperService.fromObjectToArray(data);
          subject.next(data);
        },
        (err: any) => {
          subject.error(err);
        }
      )
    return subject.asObservable();
  }
}
