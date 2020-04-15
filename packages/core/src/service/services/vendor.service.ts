import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/typeorm';
import { CreateVendorInput, UpdateVendorInput } from '@vendure/common/lib/generated-vendor-types';
import { SUPER_ADMIN_USER_IDENTIFIER, SUPER_ADMIN_USER_PASSWORD } from '@vendure/common/lib/shared-constants';
import { ID, PaginatedList } from '@vendure/common/lib/shared-types';
import { Connection } from 'typeorm';

import { EntityNotFoundError } from '../../common/error/errors';
import { ListQueryOptions } from '../../common/types/common-types';
import { User } from '../../entity/user/user.entity';
import { Vendor } from '../../entity/vendor/vendor.entity';
import { ListQueryBuilder } from '../helpers/list-query-builder/list-query-builder';
import { PasswordCiper } from '../helpers/password-cipher/password-ciper';
import { patchEntity } from '../helpers/utils/patch-entity';

import { RoleService } from './role.service';
import { UserService } from './user.service';

@Injectable()
export class VendorService {
    constructor(
        @InjectConnection() private connection: Connection,
        private listQueryBuilder: ListQueryBuilder,
        private passwordCipher: PasswordCiper,
        private userService: UserService,
        private roleService: RoleService,
    ) {}

    findAll(options?: ListQueryOptions<Vendor>): Promise<PaginatedList<Vendor>> {
        return this.listQueryBuilder
            .build(Vendor, options, { relations: ['user', 'user.roles'] })
            .getManyAndCount()
            .then(([items, totalItems]) => ({
                items,
                totalItems,
            }));
    }

    findOne(vendorId: ID): Promise<Vendor | undefined> {
        return this.connection.manager.findOne(Vendor, vendorId, {
            relations: ['user', 'user.roles'],
        });
    }

    findOneByUserId(userId: ID): Promise<Vendor | undefined> {
        return this.connection.getRepository(Vendor).findOne({
            where: {
                user: { id: userId },
                deletedAt: null,
            },
        });
    }

    async create(input: CreateVendorInput): Promise<Vendor> {
        const vendor = new Vendor(input);
        vendor.user = await this.userService.createAdminUser(input.emailAddress, input.password);
        let createdVendor = await this.connection.manager.save(vendor);
        for (const roleId of input.roleIds) {
            createdVendor = await this.assignRole(createdVendor.id, roleId);
        }
        return createdVendor;
    }

    async update(input: UpdateVendorInput): Promise<Vendor> {
        const vendor = await this.findOne(input.id);
        if (!vendor) {
            throw new EntityNotFoundError('Vendor', input.id);
        }
        let updatedVendor = patchEntity(vendor, input);
        await this.connection.manager.save(vendor, { reload: false });

        if (input.password) {
            vendor.user.passwordHash = await this.passwordCipher.hash(input.password);
        }
        if (input.roleIds) {
            vendor.user.roles = [];
            await this.connection.manager.save(vendor.user, { reload: false });
            for (const roleId of input.roleIds) {
                updatedVendor = await this.assignRole(vendor.id, roleId);
            }
        }
        return updatedVendor;
    }

    /**
     * Assigns a Role to the Vendor's User entity.
     */
    async assignRole(vendorId: ID, roleId: ID): Promise<Vendor> {
        const vendor = await this.findOne(vendorId);
        if (!vendor) {
            throw new EntityNotFoundError('Vendor', vendorId);
        }
        const role = await this.roleService.findOne(roleId);
        if (!role) {
            throw new EntityNotFoundError('Role', roleId);
        }
        vendor.user.roles.push(role);
        await this.connection.manager.save(vendor.user, { reload: false });
        return vendor;
    }
}
