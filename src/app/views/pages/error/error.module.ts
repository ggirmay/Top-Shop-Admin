import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PartialsModule } from '../../partials/partials.module';
import { CoreModule } from '../../../core/core.module';
import { RouterModule } from '@angular/router';
import { ErrorComponent } from './error.component';
import { Error1Component } from './error1/error1.component';

@NgModule({
  declarations: [
    ErrorComponent,
    Error1Component,
  ],
  imports: [
    CommonModule,
    PartialsModule,
    CoreModule,
    RouterModule.forChild([
      {
        path: '',
        component: ErrorComponent,
        children: [
          {
            path: 'error-1',
            component: Error1Component,
          }
        ],
      },
    ]),
  ],
})
export class ErrorModule {}
