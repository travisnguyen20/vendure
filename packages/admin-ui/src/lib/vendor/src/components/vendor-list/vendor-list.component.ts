import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { BaseListComponent } from '@vendure/admin-ui/core';
import { VT }  from '@vendure/admin-ui/core';
import { DataService } from '@vendure/admin-ui/core';

@Component({
    selector: 'vdr-vendor-list',
    templateUrl: './vendor-list.component.html',
    styleUrls: ['./vendor-list.component.scss'],
})
export class VendorListComponent extends BaseListComponent<
    VT.GetVendors.Query,
    VT.GetVendors.Items
> {
    constructor(private dataService: DataService, router: Router, route: ActivatedRoute) {
        super(router, route);
        super.setQueryFn(
            (...args: any[]) => this.dataService.vendor.getVendors(...args),
            data => data.vendors,
        );
    }
}
