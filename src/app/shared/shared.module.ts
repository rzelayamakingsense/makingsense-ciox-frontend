import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { RouterModule } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { SharedPipesModule } from './pipes.module'

const SHARED_MODULE = [
  CommonModule,
  FormsModule,
  ReactiveFormsModule,
  RouterModule,
  HttpClientModule,

  SharedPipesModule
];

@NgModule({
  declarations: [],
  imports: [...SHARED_MODULE],
  exports: [...SHARED_MODULE],
})
export class SharedModule { }
