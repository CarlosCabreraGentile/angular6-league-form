import { Component } from '@angular/core';
import Player from './models/player.interface';
import { PlayersService } from './services/players.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular6League';
  

  constructor() { 
  }

  

}
