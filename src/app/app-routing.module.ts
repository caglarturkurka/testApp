import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoggedInProtects } from './protects/logged-in.protects';

import { DashboardComponent } from './dashboard/dashboard.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: '/dashboard',
        pathMatch: 'full'
    },
    {
        path: 'auth',
        loadChildren: './authorization/authorization.module#AuthorizationModule'
    },
    {
        path: 'dashboard',
        canActivate: [LoggedInProtects],
        component: DashboardComponent,
        children: [
            {
                path: '',
                pathMatch: 'full',
                redirectTo: 'products'
            },
            {
                path: 'products',
                loadChildren: './products/products.module#ProductsModule'
            },
            {
                path: 'profile',
                loadChildren: './profile/profile.module#ProfileModule'
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
    providers: [
      LoggedInProtects
    ]
})
export class AppRoutingModule { }
