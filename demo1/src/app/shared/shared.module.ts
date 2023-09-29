import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuPlacementDirective } from './directives/menu-placement.directive';
import { AutoTranslateDirective } from './directives/direct-translation.directive';



@NgModule({
  declarations: [
    MenuPlacementDirective,
    AutoTranslateDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    MenuPlacementDirective,
    AutoTranslateDirective
  ]
})
export class SharedModule { }
