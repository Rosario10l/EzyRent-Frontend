import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ProductsPageRoutingModule } from './products-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from 'src/app/app.component';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  imports: [
    FormsModule,
    IonicModule.forRoot(),
    ProductsPageRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserModule,
  
  ],
  declarations: [
  ]
})
export class ProductsPageModule {}