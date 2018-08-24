import { Component, OnInit } from '@angular/core';

import Country from '../models/country.interface';
import { CountriesService } from '../services/countries.service';
import { PlayersService } from '../services/players.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-create-player',
  templateUrl: './create-player.component.html',
  styleUrls: ['./create-player.component.css']
})
export class CreatePlayerComponent implements OnInit {
  countries: Country[] = [];
  player: any = {};
  form: FormGroup; 
  object: FormGroup = null;

  constructor(private fb: FormBuilder, private countriesService: CountriesService, private playersService: PlayersService) { }

  ngOnInit() {
    this.form = this.fb.group({
      name: ['', Validators.compose([
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(10), 
      ])],
      value: ['', Validators.compose([
        Validators.required,
        Validators.maxLength(10)
      ])],
      country: ['', Validators.compose([
        Validators.required
      ])],
    })

    this.countriesService.getCountries()
      .subscribe(
        (data: Country[]) => {
          this.countries = data;
          // console.dir(this.countries);
        },
        (err: any) => {
          console.log(err);
        }
      )
  }

  /**
   * Send the request to players.service
   * @param {number} number The player number
   * @returns {void}
   * @author asdsad 
   */
  onSave(number: number): void {
    
    this.playersService.postPlayer(this.form.value);
    this.form.reset();
    alert('Bussiness Saved');
  }

}
