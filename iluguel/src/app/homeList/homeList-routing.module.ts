import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeListPage } from './homeList.page';

const routes: Routes = [
  {
    path: '',
    component: HomeListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeListPageRoutingModule {}
