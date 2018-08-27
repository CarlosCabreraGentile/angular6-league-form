import { Pipe, PipeTransform } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Subject, Observable } from 'rxjs';

@Pipe({
  name: 'countryName'
})
export class CountryNamePipe implements PipeTransform {

  constructor(private apiService: ApiService) { }

  transform(id: number): Observable<string> {
    const subject = new Subject<any>();
    this.getCountries()
      .subscribe(
        (data: any) => {
           const country = data.filter((country) =>{
            return country.id === id;
          })
          subject.next(country[0].name);
          console.log(country[0]);
          
        },
        (err: any) => {
          subject.error(err);
        },
        () => {
          subject.complete();
        }
      )
    return subject.asObservable();
  }

  public getCountries() {
    const subject = new Subject<any>();
    this.apiService.httpGetCountriesList('/countries')
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
