import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FooterComponent } from './layouts/footer/footer.component';
import { NavbarComponent } from './layouts/navbar/navbar.component';

@NgModule({
  imports: [
    CommonModule,
    NavbarComponent,
    FooterComponent,
  ],
})
export class SharedModule { }
