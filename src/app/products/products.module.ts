import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ProductsService } from './products.service';
import { ProductsRoutingModule } from './products-routing.module';
import { SharedModule } from '../shared/shared.module';
import { ProductsComponent } from './products/products.component';
import { ItemManageDialogComponent } from './item-manage-dialog/item-manage-dialog.component';
import { ItemComponent } from './item/item.component';



@NgModule({
  imports: [
    CommonModule,
    MatPaginatorModule,
    MatCheckboxModule,
    MatButtonModule,
    ProductsRoutingModule,
    MatInputModule,
    MatFormFieldModule,
    MatDialogModule,
    MatSnackBarModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    SharedModule.forRoot()
  ],
  entryComponents: [
    ItemManageDialogComponent
  ],
  declarations: [
    ProductsComponent,
    ItemManageDialogComponent,
    ItemComponent
  ],
  providers: [
    ProductsService
  ]
})
export class ProductsModule { }
