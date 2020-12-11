import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'homeList',
    loadChildren: () => import('./homeList/homeList.module').then( m => m.HomeListPageModule)
  },
  {
    path: 'propertyDetails/:id_property',
    loadChildren: () => import('./propertyDetails/propertyDetails.module').then( m => m.PropertyDetailsPageModule)
  },
  {
    path: '',
    redirectTo: 'homeList',
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
