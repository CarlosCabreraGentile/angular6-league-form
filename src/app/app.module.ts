import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';


import { AppComponent } from './app.component';
import { PlayersService } from './services/players.service';
import { ApiService } from './services/api.service';
import { RowComponent } from './row/row.component';
import { DetailPlayerComponent } from './detail-player/detail-player.component';
import { CreatePlayerComponent } from './create-player/create-player.component';
import { ModalOptionsComponent } from './modal-options/modal-options.component';

const appRoutes: Routes = [
  { path: '', component: RowComponent },
  { path: 'home', component: RowComponent },
  { path: 'details/:id', component: DetailPlayerComponent },
  { path: 'create', component: CreatePlayerComponent/*, canActivate: [MyGuard]*/ },
];

@NgModule({
  declarations: [
    AppComponent,
    RowComponent,
    DetailPlayerComponent,
    CreatePlayerComponent,
    ModalOptionsComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    ApiService,
    PlayersService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
