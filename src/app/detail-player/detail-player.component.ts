import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PlayersService } from '../services/players.service';
import { Player } from '../models/player.interface';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-detail-player',
  templateUrl: './detail-player.component.html',
  styleUrls: ['./detail-player.component.css']
})
export class DetailPlayerComponent implements OnInit {
  id: number = null;
  player: any = {};
  form: FormGroup;

  constructor(private fb: FormBuilder, private playersService: PlayersService, private route: ActivatedRoute) { 
    this.id = this.route.snapshot.params['id'];
  }

  ngOnInit() {
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

  initForm() {
    this.form = this.fb.group({
      name: [this.player.name],
      value: [this.player.value],
      country: [this.player.country],
    })
  }  

}
