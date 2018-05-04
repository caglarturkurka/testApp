import { Component, OnInit, OnDestroy } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { MatDialog } from '@angular/material';
import { MatPaginator } from '@angular/material';
import 'rxjs/add/operator/takeWhile';
import * as _ from 'lodash';

import { ProductsService } from '../products.service';
import { Product } from '../product';

import { ItemManageDialogComponent } from '../item-manage-dialog/item-manage-dialog.component';

@Component({
  selector: 'test-app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit, OnDestroy {

  public pageIndex:       number;
  public pageSize:        number;
  public itemTotal:       number;
  public items:           Product[];
  public isMoreId:        string;
  public selectedIds:     string[];
  public isSelectedItem:  boolean;
  public dialogRef:       any;

  private _alive: boolean;

  constructor(
    private _productsService: ProductsService,
    private _title:           Title,
    public dialog:            MatDialog
  ) {
    this._alive = true;
    this._title.setTitle('Products');
  }

  public ngOnInit() {

    this.selectedIds  = [];
    this.pageIndex    = 0;
    this.pageSize     = 10;
    this.itemTotal    = 0;
    this.items        = [];

    this.getProducts(this.pageIndex, this.pageSize);
  }

  public ngOnDestroy() {
    this._alive = false;
  }

  public onPaginator(event: MatPaginator): void {
    this.pageIndex  = event.pageIndex;
    this.pageSize   = event.pageSize;
    this.getProducts(this.pageIndex, this.pageSize);
  }

  public onMoreHandler(id: string): void {
    if (this.isMoreId && this.isMoreId === id) {
      this.isMoreId = null;
    } else {
      this.isMoreId = id;
    }
  }

  public getProducts(page: number, limit: number): void {
    this._productsService.getProducts().subscribe(res => {
      this._productsService.pagination(page, limit, res).then(list => {
        this.items     = list.items;
        this.itemTotal = list.total;
      });
    });
  }

  public createHandler($event: Event): void {
    this.dialogRef = this.dialog.open(ItemManageDialogComponent, {
      width: '550px',
      height: '500px'
    });

    this.dialogRef.afterClosed().subscribe((result: Product) => {
      if (result) {
        this.items.unshift(result);
        this._productsService.addProducts(result);
      }
    });
  }

  public selectedItemHandle(id): void {
    if (this.selectedIds.includes(id)) {
      _.remove(this.selectedIds, n => n === id);
    } else {
      this.selectedIds.push(id);
    }
    this.isSelectedItem = !!this.selectedIds.length;
  }

  public removeHandler($event: Event): void {
    this._productsService.removeProducts(this.selectedIds);
    this.selectedIds = [];
    this.isSelectedItem = false;
    this.getProducts(this.pageIndex, this.pageSize);
  }

}
