import { async, ComponentFixture, TestBed, fakeAsync} from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { SharedModule } from '../../shared/shared.module';

import { ChangePassDialogComponent } from './change-pass-dialog.component';

class MatDialogRefMock {
}

describe('ChangePassDialogComponent', () => {
    let component: ChangePassDialogComponent;
    let fixture: ComponentFixture<ChangePassDialogComponent>;

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
                ChangePassDialogComponent
            ],
            providers: [
                { provide: MAT_DIALOG_DATA, useValue: {} },
                { provide: MatDialogRef, useClass: MatDialogRefMock }
            ]
        })
            .compileComponents();
    }));

    function updateForm(value) {
        component.passForm.controls.password.setValue(value.password);
        component.passForm.controls.oldPassword.setValue(value.oldPassword);
        component.passForm.controls.confirmPassword.setValue(value.confirmPassword);
    }

    const validData = {
        password: '123432343',
        oldPassword: '123456',
        confirmPassword: '123432343'
    };

    const invalidData = {
        password: '123432343',
        oldPassword: '123432345',
        confirmPassword: '1234'
    };

    beforeEach(() => {
        fixture = TestBed.createComponent(ChangePassDialogComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should have passForm', () => {
        const passForm = component.passForm;
        expect(passForm).toBeDefined();
    });

    it('should be define apply method', () => {
        expect(component.apply).toBeDefined();
    });

    it('form value should update from form changes', fakeAsync(() => {
        updateForm(validData);
        expect(component.passForm.value).toEqual(validData);
    }));

    it('isValid should be true when form is valid', fakeAsync(() => {
        updateForm(validData);
        expect(component.passForm.valid).toBeTruthy();
    }));

    it('isValid should be false when form is invalid', fakeAsync(() => {
        spyOn(component.snackBar, 'open');
        updateForm(invalidData);
        expect(component.passForm.valid).toBeFalsy();
        const event = new Event('event');
        component.apply(event);
        expect(component.snackBar.open).not.toHaveBeenCalled();
    }));
});
