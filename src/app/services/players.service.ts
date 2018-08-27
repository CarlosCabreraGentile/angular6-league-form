import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { HelperService } from './helper.service';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlayersService {

  constructor(private apiService: ApiService) { }

  public getPlayers() {
    const subject = new Subject<any>();
    this.apiService.httpGet('/players')
      .subscribe(
        (data: any) => {
          // console.log(JSON.stringify(data))
          const players = HelperService.fromObjectToArray(data);
          subject.next(players);
        },
        (err: any) => {
          subject.error(err);
        }
      )
    return subject.asObservable();
  }

  public getPlayer(id) {
    const subject = new Subject<any>();
    this.apiService.httpGet(`/players/${id}`)
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

  public editPlayerValues(id, player) {
    this.apiService.httpPut('/players/' + id, player);
  }

  /**
  * Create a new player
  * @param player 
  */ 
  public postPlayer(player) {
    this.apiService.httpPostPlayer('/players', player);
  }

  public deletePlayer(id){
    return this.apiService.httpDelete(`/players/${id}`);
  }
}
