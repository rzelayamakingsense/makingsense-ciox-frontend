import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { OktaAuthInterceptor } from '@core/interceptors/okta-auth.interceptor';

import { SharedModule } from '@shared/shared.module';

import { ModalModule, BsModalService } from 'ngx-bootstrap/modal';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { NgxBootstrapIconsModule } from 'ngx-bootstrap-icons';
import { pencilSquare, trash, xLg, eye } from 'ngx-bootstrap-icons';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

import { PatientRoutingModule } from './patient-routing.module';
import { PatientApiService } from './patient-api.service';

@NgModule({
  declarations: [...PatientRoutingModule.components],
  imports: [
    SharedModule,

    PatientRoutingModule,

    PaginationModule.forRoot(),
    ModalModule.forRoot(),
    NgxBootstrapIconsModule.pick({ pencilSquare, trash, xLg, eye }),
    BsDatepickerModule.forRoot(),
  ],
  providers: [
    PatientApiService,
    BsModalService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: OktaAuthInterceptor,
      multi: true,
    },
  ],
})
export class PatientModule {}
