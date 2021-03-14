import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SafeUrlPipe } from '../core/services/pipe/safe-url.pipe';



@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [SafeUrlPipe],
  exports: [SafeUrlPipe]
})
export class GlobalPipesModule { }
