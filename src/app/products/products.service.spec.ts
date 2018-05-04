import { TestBed, inject, async } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';

import { ProductsService } from './products.service';
import { Product } from './product';

describe('ProductsService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientModule
            ],
            providers: [ProductsService]
        });
    });

    it('should be created', inject([ProductsService], (service: ProductsService) => {
        expect(service).toBeTruthy();
    }));

    it('should be define updateProduct method', inject([ProductsService], (service: ProductsService) => {
        expect(service.updateProduct).toBeTruthy();
    }));

    it('should be define addProducts method', inject([ProductsService], (service: ProductsService) => {
        expect(service.addProducts).toBeTruthy();
    }));

    it('should be define removeProducts method', inject([ProductsService], (service: ProductsService) => {
        expect(service.removeProducts).toBeTruthy();
    }));

    it('should be define getProducts method', inject([ProductsService], (service: ProductsService) => {
        expect(service.getProducts).toBeTruthy();
    }));

    it('should be define pagination method', inject([ProductsService], (service: ProductsService) => {
        expect(service.pagination).toBeTruthy();
    }));

    it('update product method must create exeption (products undefined)', async(inject(
        [ProductsService], (service, mockBackend) => {
            const value = new Product({ name: 'Name', price: '123', desc: 'Desc' });
            expect(() => service.updateProduct(value._id, value)).toThrow();
        })));

    it('update product method must create exeption (index undefined)', async(inject(
        [ProductsService], (service, mockBackend) => {
            const value = new Product({ name: 'Name', price: '123', desc: 'Desc' });
            service['_products'] = [value];
            expect(() => service.updateProduct(null, value)).toThrow();
        })));

    it('addProducts method must create exeption (value undefined)', async(inject(
        [ProductsService], (service, mockBackend) => {
            const value = new Product({ name: 'Name', price: '123', desc: 'Desc' });
            service['_products'] = [value];
            expect(() => service.addProducts(null)).toThrow();
        })));
});
