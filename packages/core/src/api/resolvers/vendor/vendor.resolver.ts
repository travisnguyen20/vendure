import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import {
    MutationAssignRoleToVendorArgs,
    MutationCreateVendorArgs,
    MutationUpdateVendorArgs,
    Permission,
    QueryVendorArgs,
    QueryVendorsArgs,
} from '@vendure/common/lib/generated-vendor-types';
import { PaginatedList } from '@vendure/common/lib/shared-types';

import { Vendor } from '../../../entity/vendor/vendor.entity';
import { VendorService } from '../../../service/services/vendor.service';
import { Allow } from '../../decorators/allow.decorator';

@Resolver('Vendor')
export class VendorResolver {
    constructor(private vendorService: VendorService) {}

    @Query()
    @Allow(Permission.ReadVendor)
    vendors(@Args() args: QueryVendorsArgs): Promise<PaginatedList<Vendor>> {
        return this.vendorService.findAll(args.options || undefined);
    }

    @Query()
    @Allow(Permission.ReadVendor)
    vendor(@Args() args: QueryVendorArgs): Promise<Vendor | undefined> {
        return this.vendorService.findOne(args.id);
    }

    @Mutation()
    @Allow(Permission.CreateVendor)
    createVendor(@Args() args: MutationCreateVendorArgs): Promise<Vendor> {
        const { input } = args;
        return this.vendorService.create(input);
    }

    @Mutation()
    @Allow(Permission.CreateVendor)
    updateVendor(@Args() args: MutationUpdateVendorArgs): Promise<Vendor> {
        const { input } = args;
        return this.vendorService.update(input);
    }

    @Mutation()
    @Allow(Permission.UpdateVendor)
    assignRoleToVendor(@Args() args: MutationAssignRoleToVendorArgs): Promise<Vendor> {
        return this.vendorService.assignRole(args.vendorId, args.roleId);
    }
}
