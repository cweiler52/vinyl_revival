import { NgModule } from '@angular/core';
import * as Material from '@angular/material';

@NgModule({
    imports: [
        Material.MatDialogModule
    ],
    exports: [
        Material.MatDialogModule
    ]
})
export class MaterialModule {}