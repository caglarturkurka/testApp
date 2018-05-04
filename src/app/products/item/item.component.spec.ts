import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { SharedModule } from '../../shared/shared.module';

import { ProductsService } from '../products.service';
import { Product } from '../product';
import { ItemComponent } from './item.component';
import { ItemManageDialogComponent } from '../item-manage-dialog/item-manage-dialog.component';


describe('ItemComponent', () => {
    let component: ItemComponent;
    let fixture: ComponentFixture<ItemComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientModule,
                MatCheckboxModule,
                MatDialogModule,
                MatInputModule,
                MatFormFieldModule,
                FormsModule,
                ReactiveFormsModule,
                SharedModule.forRoot()
            ],
            declarations: [
                ItemComponent,
                ItemManageDialogComponent
            ],
            providers: [
                ProductsService
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ItemComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        component.item = new Product({ name: 'test', desc: 'test', price: '1234' });
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should have more method', () => {
        expect(component.more).toBeDefined();
    });

    it('should have edit method', () => {
        expect(component.edit).toBeDefined();
    });

    it('should have onSelect method', () => {
        expect(component.onSelect).toBeDefined();
    });

    it('call onSelect method', () => {
        const product = new Product({ name: 'test', desc: 'test', price: '1234' });
        spyOn(component.selectEvent, 'next');
        component.onSelect(product);
        expect(component.selectEvent.next).toHaveBeenCalledWith(product._id);
    });

    it('call more method', () => {
        spyOn(component.moreEvent, 'next');
        const id = '123456';
        component.more(id);
        expect(component.moreEvent.next).toHaveBeenCalledWith(id);
    });
});
