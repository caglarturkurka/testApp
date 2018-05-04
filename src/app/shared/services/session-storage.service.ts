import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable()
export class SessionStorageService {

  public  sessionStorage: any   = sessionStorage;
  private _prefix:      string  = environment.APP_NAME;

  constructor() {
      if (!sessionStorage) {
          throw new Error('Current browser does not support Local Storage');
      }
  }

  public set(key: string, value: string): void {
      this.sessionStorage[`${this._prefix}_${key}`] = value;
  }

  public get(key: string): any {
      return this.sessionStorage[`${this._prefix}_${key}`] || false;
  }

  public setObject(key: string, value: any): void {
      this.sessionStorage[`${this._prefix}_${key}`] = JSON.stringify(value);
  }

  public getObject(key: string): any {
      return JSON.parse(this.sessionStorage[`${this._prefix}_${key}`] || '{}');
  }

  public remove(key: string): void {
      this.sessionStorage.removeItem(`${this._prefix}_${key}`);
  }

  public clear(): void {
      this.sessionStorage.clear();
  }

}






// import { Injectable } from '@angular/core';
// import { environment } from '../../../environments/environment';

// @Injectable()
// export class SessionStorageService {

//   public  sessionStorage: any   = sessionStorage;
//   private _prefix:      string  = environment.APP_NAME;

//   constructor() {
//       if (!sessionStorage) {
//           throw new Error('Current browser does not support Local Storage');
//       }
//   }

//   public set(key: string, value: string): void {
//       this.sessionStorage.setItem(`${this._prefix}_${key}`, value);
//   }

//   public get(key: string): any {
//       return this.sessionStorage.getItem(`${this._prefix}_${key}`);
//   }

//   public setObject(key: string, value: any): void {
//       this.sessionStorage.setItem(`${this._prefix}_${key}`, JSON.stringify(value));
//   }

//   public getObject(key: string): any {
//       let result = this.sessionStorage.getItem(`${this._prefix}_${key}`);
//       return JSON.parse(result);
//   }

//   public remove(key: string): void {
//       this.sessionStorage.removeItem(`${this._prefix}_${key}`);
//   }

//   public clear(): void {
//       this.sessionStorage.clear();
//   }

// }
