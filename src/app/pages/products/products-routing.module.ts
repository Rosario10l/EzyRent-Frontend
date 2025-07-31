import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductsPage } from './products.page';
import { LandlordGuard } from 'src/app/guards/landlord.guard';

const routes: Routes = [
  {
    path: '',
    component: ProductsPage
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductsPageRoutingModule {}