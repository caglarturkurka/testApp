import { async, ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Title } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

import { SharedModule } from '../../shared/shared.module';
import { ProductsService } from '../products.service';

import { ProductsComponent } from './products.component';
import { ItemManageDialogComponent } from '../item-manage-dialog/item-manage-dialog.component';
import { ItemComponent } from '../item/item.component';

describe('ProductsComponent', () => {

    let component: ProductsComponent;
    let fixture: ComponentFixture<ProductsComponent>;
    let productsService: ProductsService;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                FormsModule,
                ReactiveFormsModule,
                MatInputModule,
                MatFormFieldModule,
                MatPaginatorModule,
                MatDialogModule,
                MatCheckboxModule,
                HttpClientModule,
                BrowserAnimationsModule,
                SharedModule.forRoot()
            ],
            declarations: [
                ProductsComponent,
                ItemComponent,
                ItemManageDialogComponent
            ],
            providers: [
                ProductsService
            ]
        }).compileComponents();

        TestBed.overrideModule(BrowserDynamicTestingModule, {
            set: {
                entryComponents: [ItemManageDialogComponent]
            }
        });

        const mockSomeService = {
            getData: () => { }
        };

        TestBed.configureTestingModule({
            providers: [
                { provide: ProductsService, useValue: mockSomeService }
            ]
        });
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ProductsComponent);
        component = fixture.componentInstance;
        productsService = TestBed.get(ProductsService);
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('page title should be Products', () => {
        const _title = TestBed.get(Title);
        expect(_title.getTitle()).toBe('Products');
    });

    it('should be define onPaginator method', () => {
        expect(component.onPaginator).toBeDefined();
    });

    it('should be define onMoreHandler method', () => {
        expect(component.onMoreHandler).toBeDefined();
    });

    it('should be define getProducts method', () => {
        expect(component.getProducts).toBeDefined();
    });

    it('should be define createHandler method', () => {
        expect(component.createHandler).toBeDefined();
    });

    it('should be define selectedItemHandle method', () => {
        expect(component.selectedItemHandle).toBeDefined();
    });

    it('should be define removeHandler method', () => {
        expect(component.removeHandler).toBeDefined();
    });

    it('ngOnInit should be call get products method', fakeAsync(() => {
        spyOn(component, 'getProducts');
        component.ngOnInit();
        expect(component.getProducts).toHaveBeenCalledWith(0, 10);
    }));

    it('getProducts should be call productsService method', fakeAsync(() => {
        spyOn(productsService, 'getProducts').and.returnValue({ subscribe: () => {} });
        component.getProducts(0, 10);
        expect(productsService.getProducts).toHaveBeenCalled();
    }));

    it('removeHandler should be call productsService method', fakeAsync(() => {
        spyOn(productsService, 'removeProducts');
        spyOn(component, 'getProducts');
        component.removeHandler(new Event('click'));
        expect(productsService.removeProducts).toHaveBeenCalled();
        expect(component.getProducts).toHaveBeenCalled();
    }));
});
