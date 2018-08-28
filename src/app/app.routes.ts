import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';

import { Routes, RouterModule } from '@angular/router';

import { RowComponent } from './row/row.component';
import { DetailPlayerComponent } from './detail-player/detail-player.component';
import { FormPlayerComponent } from './form-player/form-player.component';
import { NgModule } from '@angular/core';


export const routes: Routes = [
    {
        path: '',
        component: MainLayoutComponent,
        children: [
            {
                path: '',
                redirectTo: '/players',
                pathMatch: 'full',
            },
            {
                path: 'players',
                component: RowComponent
            },
            {
                path: 'user/detail/:id',
                component: DetailPlayerComponent
            },
            {
                path: 'user/create',
                component: FormPlayerComponent
            },
            {
                path: 'user/edit/:id',
                component: FormPlayerComponent
            },
            {
                path: 'user/detail/:id',
                component: DetailPlayerComponent
            }
        ]
    },
    // { path: 'home', component: RowComponent },
    // { path: 'user/detail/:id', component: DetailPlayerComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule { }

