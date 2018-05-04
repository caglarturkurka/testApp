import { async, ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { SharedModule } from '../../shared/shared.module';
import { ItemManageDialogComponent } from './item-manage-dialog.component';

class MatDialogRefMock {
}

describe('ItemManageDialogComponent', () => {
    let component: ItemManageDialogComponent;
    let fixture: ComponentFixture<ItemManageDialogComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                BrowserAnimationsModule,
                MatDialogModule,
                MatInputModule,
                MatFormFieldModule,
                MatSnackBarModule,
                FormsModule,
                ReactiveFormsModule,
                SharedModule.forRoot()
            ],
            declarations: [
                ItemManageDialogComponent
            ],
            providers: [
                { provide: MAT_DIALOG_DATA, useValue: {} },
                { provide: MatDialogRef, useClass: MatDialogRefMock }
            ]
        })
            .compileComponents();
    }));

    function updateForm(value) {
        component.itemForm.controls.name.setValue(value.name);
        component.itemForm.controls.price.setValue(value.price);
        component.itemForm.controls.desc.setValue(value.desc);
    }

    const validData = {
        name: 'qwer',
        price: '123456789',
        desc: 'qwerty'
    };

    const invalidData = {
        name: 'qwer',
        price: '1234qw',
        desc: ''
    };

    beforeEach(() => {
        fixture = TestBed.createComponent(ItemManageDialogComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should have itemForm', () => {
        const itemForm = component.itemForm;
        expect(itemForm).toBeDefined();
    });

    it('should be define apply method', () => {
        expect(component.apply).toBeDefined();
    });

    it('form value should update from form changes', fakeAsync(() => {
        updateForm(validData);
        expect(component.itemForm.value).toEqual(validData);
    }));

    it('isValid should be true when form is valid', fakeAsync(() => {
        spyOn(component.snackBar, 'open');
        updateForm(validData);
        expect(component.itemForm.valid).toBeTruthy();
    }));

    it('isValid should be false when form is invalid', fakeAsync(() => {
        spyOn(component.snackBar, 'open');
        updateForm(invalidData);
        expect(component.itemForm.valid).toBeFalsy();
        const event = new Event('event');
        component.apply(event);
        expect(component.snackBar.open).not.toHaveBeenCalled();
    }));

});
