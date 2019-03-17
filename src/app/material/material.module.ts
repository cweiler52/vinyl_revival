import { NgModule } from '@angular/core';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatExpansionModule } from '@angular/material/expansion';


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
        BrowserAnimationsModule,
        MatExpansionModule
    ],
    exports: [
        MatGridListModule,
        MatPaginatorModule,
        MatToolbarModule,
        MatTabsModule,
        MatSidenavModule,
        BrowserAnimationsModule,
        MatExpansionModule
    ]
})
export class MaterialModule {}