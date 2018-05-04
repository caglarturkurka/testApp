export class Product {

    _id:        string;
    number:     number | string;
    name:       string;
    price:      string;
    desc:       string;
    date:       Date;
    isChecked?: boolean;

    constructor(data: IProduct) {
        this.name   = data.name;
        this.price  = data.price;
        this.desc   = data.desc;
        this._id    = this._generateID();
        this.number = this._generateNumber();
        this.date   = this._generateDate();
    }

    private _generateID(): string {
        return Date.now().toString();
    }

    private _generateDate(): Date {
        return new Date();
    }

    private _generateNumber(): string {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }
}

export interface IProduct {
    name:   string;
    price:  string;
    desc:   string;
}
