import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';

import { Player } from '../models/player.interface';
import { PlayersService } from '../services/players.service';


@Component({
  selector: 'app-row',
  templateUrl: './row.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./row.component.css'],
  styles: [`
  .dark-modal .modal-content {
    background-color: #292b2c;
    color: white;
  }
  .dark-modal .close {
    color: white;
  }
  .light-blue-backdrop {
    background-color: #5cb3fd;
  }
`]
})
export class RowComponent implements OnInit {
  closeResult: string;
  players: Player[] = [];
  bussiness: any = {};
  id: number;
  selectedPlayer: Player;

  constructor(private playersService: PlayersService, private router: Router, private modalService: NgbModal) {
  }

  ngOnInit() {
    this.playersService.getPlayers()
      .subscribe(
        (data: Player[]) => {
          this.players = data;
          console.dir(this.players);
        },
        (err: any) => {
          console.log(err);
        }
      )
  }

  createPlayer() {
    this.router.navigate(['user/create']);
  }

  editPlayer(id: number, event) {
    event.stopPropagation();
    this.router.navigate([`user/edit/${id}`]);
  }

  deletePlayerSelected(id: number) {
    this.playersService.deletePlayer(id)
    .subscribe( (data: Player) => {
      this.players = this.players.filter((player) =>{
        return player.id !== data.id;
      })
    },
    (err: any) => {
      console.error(err);
    })
  }

  openVerticallyCentered(content, player, event) {
    event.stopPropagation();
    this.selectedPlayer = player;
    this.modalService.open(content, { centered: true });
  }

  detailPlayer(id: number){
    console.log(id);
    this.router.navigate([`user/detail/${id}`]);
  }

}
