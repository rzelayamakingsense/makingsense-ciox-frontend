import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ApiHttpService } from './services/api-http.services';

const ROOT_MODULE = [CommonModule, BrowserModule, BrowserAnimationsModule];

@NgModule({
  declarations: [],
  providers: [ApiHttpService],
  imports: [...ROOT_MODULE],
})
export class CoreModule {
  constructor(
    @Optional()
    @SkipSelf()
    parentModule: CoreModule,
  ) {
    if (parentModule) {
      throw new Error('CoreModule is already loaded. Import only in AppModule');
    }
  }
}
