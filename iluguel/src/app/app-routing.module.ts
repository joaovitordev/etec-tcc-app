import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'home-list',
    loadChildren: () => import('./home-list/home-list.module').then( m => m.HomeListPageModule)
  },
  {
    path: 'property-details/:id_property',
    loadChildren: () => import('./property-details/property-details.module').then( m => m.PropertyDetailsPageModule)
  },
  {
    path: '',
    redirectTo: 'home-list',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
