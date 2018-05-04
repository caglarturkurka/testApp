import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material';

import { Product } from '../product';
import { ProductsService } from '../products.service';
import { ItemManageDialogComponent } from '../item-manage-dialog/item-manage-dialog.component';

@Component({
  selector: 'test-app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent {

  @Input()  public item:          Product;
  @Input()  public moreId:        string;
  @Output() public moreEvent:     EventEmitter<string> = new EventEmitter<string>();
  @Output() public selectEvent:   EventEmitter<string> = new EventEmitter<string>();

  constructor(
    public dialog: MatDialog,
    private _productsService: ProductsService
  ) { }

  public edit(data: Product): void {
    const dialogRef = this.dialog.open(ItemManageDialogComponent, {
      width: '550px',
      height: '500px',
      data
    });

    dialogRef.afterClosed().subscribe((result: Product) => {
      this.item = result;
      this._productsService.updateProduct(result._id, result);
    });
  }

  public more(id: string): void {
    this.moreEvent.next(id);
  }

  public onSelect(item: Product): void {
    this.item.isChecked = !this.item.isChecked;
    this.selectEvent.next(item._id);
  }

}
