import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { RowComponent } from './row/row.component';
import { DetailPlayerComponent } from './detail-player/detail-player.component';
import { FormPlayerComponent } from './form-player/form-player.component';

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
                path: 'home',
                redirectTo: '/players',
                pathMatch: 'full',
            },
            {
                path: 'players',
                component: RowComponent
            },
            {
                path: 'user/detail',
                component: DetailPlayerComponent
            },
            {
                path: 'user/create',
                component: FormPlayerComponent
            },
            {
                path: 'user/edit/:id',
                component: FormPlayerComponent
            }
        ]
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule { }
