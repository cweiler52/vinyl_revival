import { NgModule } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';

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
        BrowserAnimationsModule,
        MatIconModule,
        MatButtonModule
    ],
    exports: [
        MatGridListModule,
        MatPaginatorModule,
        MatToolbarModule,
        MatTabsModule,
        MatSidenavModule,
        BrowserAnimationsModule,
        MatIconModule,
        MatButtonModule
    ]
})
export class MaterialModule {}