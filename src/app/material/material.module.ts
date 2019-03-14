import { NgModule } from '@angular/core';

import {
MatGridListModule,
MatPaginatorModule,
MatToolbarModule
} from '@angular/material';

@NgModule({
    imports: [
        MatGridListModule,
        MatPaginatorModule,
        MatToolbarModule
    ],
    exports: [
        MatGridListModule,
        MatPaginatorModule,
        MatToolbarModule
    ]
})
export class MaterialModule {}