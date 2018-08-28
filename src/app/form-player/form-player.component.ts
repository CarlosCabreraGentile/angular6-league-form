import { Component, OnInit } from '@angular/core';

import { Country } from '../models/country.interface';
import { CountriesService } from '../services/countries.service';
import { PlayersService } from '../services/players.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Player } from '../models/player.interface';
import { Subject, Observable } from 'rxjs';


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

  constructor(private fb: FormBuilder, private countriesService: CountriesService, 
    private playersService: PlayersService, private route: ActivatedRoute, private router: Router) {
    this.id = this.route.snapshot.params['id'];
  }

  ngOnInit() {
    //If there is an id, get specific player
    if (this.id) {
      this.playersService.getPlayer(this.id)
        .subscribe(
          (data: Player) => {
            this.player = data;
            this.initForm();
          },
          (err: any) => {
            console.error(err);
          }
        )
    } 
    //If not, then initialize an empty form
    else {
      this.initForm();
    }

    //Get the list of contries
    this.countriesService.getCountries()
      .subscribe(
        (data: Country[]) => {
          this.countries = data;
        },
        (err: any) => {
          console.error(err);
        }
      )
  }

  /**
   * Function that initialize the form
   * @returns {void}
   */
  initForm(): void {
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
   * Submit the form with player info
   * @returns {void}
   */
  onSave(): void {
    // If there is not an id, create a new player
    if (!this.id) {
      this.createPlayer()
        .subscribe(() => {
          this.form.reset();
          this.router.navigate(['home']);
        });
    }
    //If a there is an id, edit player
    else {
      this.editPlayer()
        .subscribe(() => {
          this.form.reset();
          this.router.navigate(['home']);
        });
    }
  }

  /**
   * Create a player
   * @returns {Observable<void>}
   */
  private createPlayer(): Observable<void> {
    const subject = new Subject<any>();
    this.playersService.postPlayer(this.form.value)
      .subscribe(
        () => subject.next(),
        error => subject.error(error),
        () => subject.complete()
      );
    return subject.asObservable();
  }

  /**
   * Edit player
   * @returns {Observable<void>}
   */
  private editPlayer(): Observable<void> {
    const subject = new Subject<any>();
    this.playersService.putPlayer(this.id, this.form.value)
      .subscribe(
        () => subject.next(),
        error => subject.error(error),
        () => subject.complete()
      );
    return subject.asObservable();
  }
}
