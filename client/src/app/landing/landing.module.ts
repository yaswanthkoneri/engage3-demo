import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material.module';
import { LandingRoutingModule } from './landing-routing.module';
import { LoginComponent } from './login/login.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
@NgModule({
  imports: [
    CommonModule,
    LandingRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    HttpClientModule
  ],
  declarations: [LoginComponent],
  exports: [LoginComponent]
})
export class LandingModule {
  static forRoot(): ModuleWithProviders {
    return {
        ngModule: LandingModule,
        providers: []
    };
}
}
