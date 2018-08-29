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
import { FormPlayerComponent } from './form-player/form-player.component'; 
import { ModalOptionsComponent } from './modal-options/modal-options.component';
import { CountryNamePipe } from './pipes/country-name.pipe';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';

// Routing module
import { AppRoutingModule } from './app.routes';
import { BreadcrumbComponent } from './breadcrumbs/breadcrumb/breadcrumb.component';

@NgModule({
  declarations: [
    AppComponent,
    RowComponent,
    DetailPlayerComponent,
    FormPlayerComponent,
    ModalOptionsComponent,
    CountryNamePipe,
    MainLayoutComponent,
    BreadcrumbComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    AppRoutingModule
  ],
  providers: [
    ApiService,
    PlayersService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
