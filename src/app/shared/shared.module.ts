import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SharedPipesModule } from './pipes.module';
import { HttpClientModule } from '@angular/common/http';

const SHARED_MODULE = [CommonModule, FormsModule, ReactiveFormsModule, HttpClientModule, SharedPipesModule];

@NgModule({
  providers: [],
  declarations: [],
  imports: [...SHARED_MODULE],
  exports: [...SHARED_MODULE],
})
export class SharedModule {}
