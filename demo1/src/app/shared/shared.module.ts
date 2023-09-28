import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuPlacementDirective } from './directives/menu-placement.directive';



@NgModule({
  declarations: [
    MenuPlacementDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    MenuPlacementDirective
  ]
})
export class SharedModule { }
