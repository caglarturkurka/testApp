import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable()
export class LocalStorageService {

    public  localStorage: any     = localStorage;
    private _prefix:      string  = environment.APP_NAME;

    constructor() {
        if (!localStorage) {
            throw new Error('Current browser does not support Local Storage');
        }
    }

    public set(key: string, value: string): void {
        this.localStorage[`${this._prefix}_${key}`] = value;
    }

    public get(key: string): any {
        return this.localStorage[`${this._prefix}_${key}`] || false;
    }

    public setObject(key: string, value: any): void {
        this.localStorage[`${this._prefix}_${key}`] = JSON.stringify(value);
    }

    public getObject(key: string): any {
        return JSON.parse(this.localStorage[`${this._prefix}_${key}`] || '{}');
    }

    public remove(key: string): void {
        this.localStorage.removeItem(`${this._prefix}_${key}`);
    }

    public clear(): void {
        this.localStorage.clear();
    }
}
