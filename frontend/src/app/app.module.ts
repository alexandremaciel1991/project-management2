import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { AngularMaterialModule } from './shared/angular-material/angular-material.module';
import { SnackBarComponent } from './shared/components/snack-bar/snack-bar.component';
import { ToolbarComponent } from './commom/components/toolbar/toolbar.component';
import { LOCALE_ID } from '@angular/core';
import localePt from '@angular/common/locales/pt';
import { registerLocaleData } from '@angular/common';

registerLocaleData(localePt);
@NgModule({
  declarations: [AppComponent, SnackBarComponent, ToolbarComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AngularMaterialModule,
  ],
  providers: [{ provide: LOCALE_ID, useValue: 'pt-Br' }],
  bootstrap: [AppComponent],
})
export class AppModule {}
