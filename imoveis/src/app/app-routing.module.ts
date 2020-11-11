import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'tabs',
    pathMatch: 'full'
  },
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'imovel/:id',
    loadChildren: () => import('./home/property-details/property-details-routing.module').then( m => m.PropertyDetailsPageRoutingModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },  {
    path: 'home-list',
    loadChildren: () => import('./home-list/home-list.module').then( m => m.HomeListPageModule)
  },
  {
    path: 'property-details',
    loadChildren: () => import('./property-details/property-details.module').then( m => m.PropertyDetailsPageModule)
  }


];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
