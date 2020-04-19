import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BaseEntityResolver } from '@vendure/admin-ui/core';
import { VT } from '@vendure/admin-ui/core';
import { DataService } from '@vendure/admin-ui/core';

@Injectable({
    providedIn: 'root',
})
export class VendorResolver extends BaseEntityResolver<VT.Vendor.Fragment> {
    constructor(router: Router, dataService: DataService) {
        super(
            router,
            {
                __typename: 'Vendor' as 'Vendor',
                id: '',
                createdAt: '',
                updatedAt: '',
                emailAddress: '',
                firstName: '',
                lastName: '',
                user: { roles: [] } as any,
            },
            id => dataService.vendor.getVendor(id).mapStream(data => data.vendor),
        );
    }
}
