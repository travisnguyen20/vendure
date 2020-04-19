import { Route } from '@angular/router';
import { marker as _ } from '@biesbjerg/ngx-translate-extract-marker';
import { CanDeactivateDetailGuard, createResolveData, detailBreadcrumb, VT } from '@vendure/admin-ui/core';

import { VendorDetailComponent } from './components/vendor-detail/vendor-detail.component';
import { VendorListComponent } from './components/vendor-list/vendor-list.component';
import { VendorResolver } from './providers/routing/vendor-resolver';

export const vendorRoutes: Route[] = [
    {
        path: 'vendors',
        component: VendorListComponent,
        pathMatch: '',
        data: {
            breadcrumb: _('breadcrumb.vendors'),
        },
    },
    {
        path: 'vendors/:id',
        component: VendorDetailComponent,
        resolve: createResolveData(VendorResolver),
        canDeactivate: [CanDeactivateDetailGuard],
        data: {
            breadcrumb: vendorBreadcrumb,
        },
    },
];

export function vendorBreadcrumb(data: any, params: any) {
    return detailBreadcrumb<VT.Vendor.Fragment>({
        entity: data.entity,
        id: params.id,
        breadcrumbKey: 'breadcrumb.vendors',
        getName: vendor => `${vendor.firstName} ${vendor.lastName}`,
        route: 'vendors',
    });
}
