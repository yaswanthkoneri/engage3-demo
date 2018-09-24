import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandingModule } from './landing/landing.module';
import { AuthenticationService } from './services/authentication/authentication.service';
const routes: Routes = [
  {
    path: '',
    redirectTo: 'admin/jobs',
    pathMatch: 'full'
  },
  {
    path: 'admin',
    loadChildren: './admin/admin.module#AdminModule',
    canActivate: [AuthenticationService]

  },
  {
    path: 'login',
    loadChildren: './landing/landing.module#LandingModule'
  },
  { path: '**', redirectTo: 'admin/jobs' },
  // {
  //   path: '**',
  //   redirectTo: '/'
  // },
];

@NgModule({
  imports: [RouterModule.forRoot(routes),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
