import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';

import { Player } from '../models/player.interface';
import { PlayersService } from '../services/players.service';
import { CountriesService } from '../services/countries.service';
import { Country } from '../models/country.interface';
import { forkJoin } from 'rxjs';


@Component({
  selector: 'app-row',
  templateUrl: './row.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./row.component.css']
})

export class RowComponent implements OnInit {
  closeResult: string;
  players: Player[] = [];
  countries: Country[] = [];
  bussiness: any = {};
  id: number;
  selectedPlayer: Player;

  constructor(
    private playersService: PlayersService,
    private counstriesService: CountriesService,
    private router: Router,
    private modalService: NgbModal
    ) { }

  ngOnInit() {
    forkJoin(
      this.playersService.getPlayers(),
      this.counstriesService.getCountries()
    ).subscribe(
      ([players, countries]) => {
        this.players = players;
        localStorage.setItem('countries', JSON.stringify(countries));
      },
      (err: any) => {
        console.error(err);
      }
    )
  }

  /**
   * Create a player
   */
  createPlayer() {
    this.router.navigate(['user/create']);
  }

  /**
   * Edit a player
   * @param id player id
   * @param event
   */
  editPlayer(id: number, event) {
    //This function prevent cascade clic function
    event.stopPropagation();
    this.router.navigate([`user/edit/${id}`]);
  }

  /**
   * Delete a specific player
   * @param id
   */
  deletePlayerSelected(id: number) {
    this.playersService.deletePlayer(id)
      .subscribe((data: Player) => {
        this.players = this.players.filter((player) => {
          return player.id !== data.id;
        })
      },
        (err: any) => {
          console.error(err);
        })
  }

  /**
   * Function that open a modal
   * @param content
   * @param player
   * @param event
   */
  openVerticallyCentered(content, player, event) {
    //This function prevent cascade clic function
    event.stopPropagation();
    this.selectedPlayer = player;
    this.modalService.open(content, { centered: true });
  }

  /**
   * Function show details from player
   * @param id id player
   */
  detailPlayer(player: any) {
    this.router.navigate([`user/detail`, player]);
  }

}
