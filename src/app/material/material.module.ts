import { NgModule } from '@angular/core';

import {
MatGridListModule,
MatPaginatorModule,
MatToolbarModule,
MatTabsModule
} from '@angular/material';



@NgModule({
    imports: [
        MatGridListModule,
        MatPaginatorModule,
        MatToolbarModule,
        MatTabsModule
    ],
    exports: [
        MatGridListModule,
        MatPaginatorModule,
        MatToolbarModule,
        MatTabsModule
    ]
})
export class MaterialModule {}