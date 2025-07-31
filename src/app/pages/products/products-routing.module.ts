import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductsPage } from './products.page';
import { ProductFormComponent } from './components/product-form/product-form.component';
import { LandlordGuard } from 'src/app/guards/landlord.guard';

const routes: Routes = [
  {
    path: '',
    component: ProductsPage
  },
  {
    path: 'new',
    component: ProductFormComponent,
    canActivate: [LandlordGuard]
  },
  {
    path: 'edit/:id',
    component: ProductFormComponent,
    canActivate: [LandlordGuard]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductsPageRoutingModule {}