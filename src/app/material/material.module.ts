import { NgModule } from '@angular/core';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import {
MatGridListModule,
MatPaginatorModule,
MatToolbarModule,
MatTabsModule,
MatSidenavModule
} from '@angular/material';



@NgModule({
    imports: [
        MatGridListModule,
        MatPaginatorModule,
        MatToolbarModule,
        MatTabsModule,
        MatSidenavModule,
        BrowserAnimationsModule
    ],
    exports: [
        MatGridListModule,
        MatPaginatorModule,
        MatToolbarModule,
        MatTabsModule,
        MatSidenavModule,
        BrowserAnimationsModule
    ]
})
export class MaterialModule {}