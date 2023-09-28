import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { appFeatureKey, appReducers } from './store/app.reducers';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature(appFeatureKey, appReducers)
  ]
})
export class CoreModule { }
