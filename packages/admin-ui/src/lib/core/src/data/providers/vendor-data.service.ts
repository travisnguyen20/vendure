import {
    CreateVendor,
    CreateVendorInput,
    GetVendor,
    GetVendors,
    UpdateVendor,
    UpdateVendorInput,
} from '../../common/generated-vendor-types';
import {
    CREATE_VENDOR,
    GET_VENDOR,
    GET_VENDORS,
    UPDATE_VENDOR,
} from '../vendor-definitions/vendor-definitions';

import { BaseDataService } from './base-data.service';

export class VendorDataService {
    constructor(private baseDataService: BaseDataService) {}

    getVendors(take: number = 10, skip: number = 0) {
        return this.baseDataService.queryVendor<GetVendors.Query, GetVendors.Variables>(
            GET_VENDORS,
            {
                options: {
                    take,
                    skip,
                },
            },
        );
    }

    getVendor(id: string) {
        return this.baseDataService.queryVendor<GetVendor.Query, GetVendor.Variables>(
            GET_VENDOR,
            {
                id,
            },
        );
    }

    createVendor(input: CreateVendorInput) {
        return this.baseDataService.mutateVendor<CreateVendor.Mutation, CreateVendor.Variables>(
            CREATE_VENDOR,
            { input },
        );
    }

    updateVendor(input: UpdateVendorInput) {
        return this.baseDataService.mutateVendor<UpdateVendor.Mutation, UpdateVendor.Variables>(
            UPDATE_VENDOR,
            { input },
        );
    }
}
