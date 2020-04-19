import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '@vendure/admin-ui/core';

import { VendorDetailComponent } from './components/vendor-detail/vendor-detail.component';
import { VendorListComponent } from './components/vendor-list/vendor-list.component';
import { PermissionGridComponent } from './components/permission-grid/permission-grid.component';
import { vendorRoutes } from './vendor.routes';

@NgModule({
    imports: [SharedModule, RouterModule.forChild(vendorRoutes)],
    declarations: [
        VendorDetailComponent,
        VendorListComponent,
        PermissionGridComponent
    ],
    exports: [],
})
export class VendorModule {}
