import { Component, OnInit } from '@angular/core';

import Player from '../models/player.interface';
import { PlayersService } from '../services/players.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-row',
  templateUrl: './row.component.html',
  styleUrls: ['./row.component.css']
})
export class RowComponent implements OnInit {
  players: Player[] = [];
  bussiness: any = {};
  id: any = null; 

  constructor(private playersService: PlayersService, private router: Router) { 
  }

  ngOnInit(){
    this.playersService.getPlayers()
    .subscribe(
      (data: Player[]) => {
        this.players = data;
        // console.dir(this.players);
      },
      (err: any) => {
        console.log(err);
      }
    ) 
  }

  createPlayer(){
    this.router.navigate(['create']);
  }

  editPlayer(id:number) {
      this.router.navigate([`details/${id}`]);
      // this.playersService.editPlayerValues(this.id, this.players[this.id]);
      // alert('Player Edited');
    }

}
