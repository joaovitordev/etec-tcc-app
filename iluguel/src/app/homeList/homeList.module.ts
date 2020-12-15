import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomeListPageRoutingModule } from './homeList-routing.module';

import { HomeListPage } from './homeList.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomeListPageRoutingModule
  ],
  declarations: [HomeListPage]
})
export class HomeListPageModule {}
