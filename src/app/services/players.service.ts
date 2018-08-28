import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Subject, Observable } from 'rxjs';
import { Player } from '../models/player.interface';

@Injectable({
  providedIn: 'root'
})
export class PlayersService {

  constructor(private apiService: ApiService) { }

  /**
   * Get players from API
   * @returns {Observable}
   */
  public getPlayers(): Observable<Player[]> {
    const subject = new Subject<any>();
    this.apiService.httpGet('/players')
    //Create a subscribe because you can manipulate the data, otherwise its not necessary to subscribe
      .subscribe(
        (data: any) => {
          // const players = HelperService.fromObjectToArray(data);
          subject.next(data);
        },
        (err: any) => {
          subject.error(err);
        },
        () => {
          subject.complete();
        }

      )
    return subject.asObservable();
  }

  /**
   * Get one player from API by an id 
   * @param id id from player
   * @returns {Observable<Player>}
   */
  public getPlayer(id: number): Observable<Player> { 
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

  /**
   * Edit player info
   * @param id id from player
   * @param player 
   * @returns {Observable<Player>}
   */
  public putPlayer(id: number, player: Player):Observable<Player> {
    return this.apiService.httpPut('/players/' + id, player);
  }

  /**
  * Create a new player
  * @param player
  * @returns {Observable<Player>}
  */ 
  public postPlayer(player):Observable<Player> {
    return this.apiService.httpPost('/players', player);
  }

  /**
   * Delete a specific player
   * @param id id from player
   * @returns {Observable<Player>}
   */
  public deletePlayer(id: number):Observable<Player> {
    return this.apiService.httpDelete(`/players/${id}`);
  }
}
