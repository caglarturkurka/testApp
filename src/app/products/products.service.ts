import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { catchError, map, tap } from 'rxjs/operators';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import * as _ from 'lodash';

import { Product } from './product';
import { ListResult } from './list-result.interface';

@Injectable()
export class ProductsService {

  private _products: Product[];

  constructor(
    private _http: HttpClient
  ) { }

  public updateProduct(id: string, value: Product) {
    if (this._products) {
      const index = _.findIndex(this._products, i =>  i._id === id);
      if (index !== -1) {
        this._products[index] = value;
      } else {
        throw Error('Error index not found!');
      }
    } else {
      throw Error('Error products undefined!');
    }
  }

  public removeProducts(ids: string[]) {
    if (this._products) {
      this._products = _.filter(this._products, i => !ids.includes(i._id));
    } else {
      throw Error('Error products undefined!');
    }
  }

  public addProducts(value: Product) {
    if (this._products) {
      if (value) {
        this._products.unshift(value);
      } else {
        throw Error('Error product undefined!');
      }
    } else {
      throw Error('Error products undefined!');
    }
  }

  public getProducts(): Observable<Product[]> {
    if (this._products) {
      return Observable.of(this._products);
    } else {
      return <Observable<Product[]>>this._http.get('./assets/mock/products.json')
        .map((res: Product[]) => {
          this._products = res;
          return res;
        });
    }
  }

  public pagination(page: number = 0, limit: number = 10, values: Product[]): Promise<ListResult<Product>> {
    const _range: number[] = _.range(0, values.length, limit);
    return new Promise((resolve, reject) => {
      return resolve({
        items: values.slice(_range[page], _range[page + 1]),
        total: values.length
      });
    });
  }

}


