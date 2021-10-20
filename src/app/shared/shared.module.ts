// Core
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { RouterModule } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

// Facade
import { SharedFacade } from "./shared.facade";

// Containers

// Interceptors

// Components

// State
import { SharedState } from "./shared.state";

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [],
})
export class SharedModule {
  static forRoot() {
    return {
      ngModule: SharedModule,
      providers: [
        SharedFacade,
        // SharedState,
        // {
        //   provide: HTTP_INTERCEPTORS,
        //   useClass: LoaderInterceptor,
        //   multi: true,
        // },
      ],
    };
  }
}
