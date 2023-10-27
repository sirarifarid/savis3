import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http';
// import { OneProportionComponent } from './one-proportion/one-proportion.component';
import { TempComponent } from './temp/temp.component';
import { NgChartsModule } from 'ng2-charts';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    // OneProportionComponent,
    TempComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    NgChartsModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
