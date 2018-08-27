import { Component, OnInit } from '@angular/core';

import { Country } from '../models/country.interface';
import { CountriesService } from '../services/countries.service';
import { PlayersService } from '../services/players.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { Player } from '../models/player.interface';


@Component({
  selector: 'app-form-player',
  templateUrl: './form-player.component.html',
  styleUrls: ['./form-player.component.css']
})
export class FormPlayerComponent implements OnInit {
  countries: Country[] = [];
  player: any = {};
  form: FormGroup; 
  object: FormGroup = null;
  id: number = null;

  constructor(private fb: FormBuilder, private countriesService: CountriesService, private playersService: PlayersService, private route: ActivatedRoute) { 
    this.id = this.route.snapshot.params['id'];
  }

  ngOnInit() {
    if (this.id) {
      this.playersService.getPlayer(this.id)
      .subscribe(
        (data: Player) => {
          this.player = data;
          console.dir(this.player.country);
          this.initForm();
        },
        (err: any) => {
          console.log(err);
        }
      )
    } else {
      console.log('create');
      this.initForm();
    }
    
    this.countriesService.getCountries()
      .subscribe(
        (data: Country[]) => {
          this.countries = data;
          // console.log(this.countries);
        },
        (err: any) => {
          console.log(err);
        }
      )
  }

  initForm(){
    this.form = this.fb.group({
      name: [this.player.name || '', Validators.compose([
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(10), 
      ])],
      value: [this.player.value || '', Validators.compose([
        Validators.required,
        Validators.maxLength(10)
      ])],
      country: [this.player.country || '', Validators.compose([
        Validators.required
      ])],
    })
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
    alert('Player Saved');
  }

}
