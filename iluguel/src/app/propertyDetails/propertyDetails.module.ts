import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PropertyDetailsPageRoutingModule } from './propertyDetails-routing.module';

import { PropertyDetailsPage } from './propertyDetails.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PropertyDetailsPageRoutingModule
  ],
  declarations: [PropertyDetailsPage]
})
export class PropertyDetailsPageModule {}
