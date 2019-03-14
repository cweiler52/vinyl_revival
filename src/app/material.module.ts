import { NgModule } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material';

@NgModule({
    imports: [
      MatDialog,
      MAT_DIALOG_DATA,
    ],
    exports: [
      MatDialog,
      MAT_DIALOG_DATA
    ]
})
export class MaterialModule {}