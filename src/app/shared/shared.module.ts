import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SharedPipesModule } from './pipes.module';
import { HttpClientModule } from '@angular/common/http';
import { SortLinkComponent } from './components/sort-link/sort-link.component';

const SHARED_MODULE = [CommonModule, FormsModule, ReactiveFormsModule, HttpClientModule, SharedPipesModule];
const SHARED_COMPONENT = [SortLinkComponent]
@NgModule({
  providers: [],
  declarations: [SHARED_COMPONENT],
  imports: [...SHARED_MODULE],
  exports: [...SHARED_MODULE, SHARED_COMPONENT],
})
export class SharedModule { }
