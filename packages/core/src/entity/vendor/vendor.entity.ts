import { DeepPartial } from '@vendure/common/lib/shared-types';
import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';

import { VendureEntity } from '../base/base.entity';
import { User } from '../user/user.entity';

/**
 * @description
 * An administrative user who has access to the admin ui.
 *
 * @docsCategory entities
 */
@Entity()
export class Vendor extends VendureEntity {
    constructor(input?: DeepPartial<Vendor>) {
        super(input);
    }

    @Column() firstName: string;

    @Column() lastName: string;

    @Column({ unique: true })
    emailAddress: string;

    @OneToOne((type) => User)
    @JoinColumn()
    user: User;
}
