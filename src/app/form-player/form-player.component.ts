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

  constructor(private fb: FormBuilder, private countriesService: CountriesService, private playersService: PlayersService, private route: ActivatedRoute, private router: Router) {
    this.id = this.route.snapshot.params['id'];
  }

  ngOnInit() {
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
    } else {
      this.initForm();
    }

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

  initForm() {
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
  onSave(): void {
    // Si estas creando un usuario nuevo
    if (!this.id) {
      this.createPlayer()
        .subscribe(() => {
          this.form.reset();
          this.router.navigate(['home']);
        });
    }
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
   * //params
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
