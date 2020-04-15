import { Module } from '@nestjs/common';
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import path from 'path';

import { DataImportModule } from '../data-import/data-import.module';
import { ServiceModule } from '../service/service.module';

import { AdminApiModule, ApiSharedModule, ShopApiModule, VendorApiModule } from './api-internal-modules';
import { RequestContextService } from './common/request-context.service';
import { configureGraphQLModule } from './config/configure-graphql-module';
import { AuthGuard } from './middleware/auth-guard';
import { ExceptionLoggerFilter } from './middleware/exception-logger.filter';
import { IdInterceptor } from './middleware/id-interceptor';
import { ValidateCustomFieldsInterceptor } from './middleware/validate-custom-fields-interceptor';

/**
 * The ApiModule is responsible for the public API of the application. This is where requests
 * come in, are parsed and then handed over to the ServiceModule classes which take care
 * of the business logic.
 */
@Module({
    imports: [
        ServiceModule.forRoot(),
        DataImportModule,
        ApiSharedModule,
        AdminApiModule,
        ShopApiModule,
        VendorApiModule,
        configureGraphQLModule((configService) => ({
            apiType: 'shop',
            apiPath: configService.shopApiPath,
            typePaths: ['type', 'shop-api', 'common'].map((p) =>
                path.join(__dirname, 'schema', p, '*.graphql'),
            ),
            resolverModule: ShopApiModule,
        })),
        configureGraphQLModule((configService) => ({
            apiType: 'admin',
            apiPath: configService.adminApiPath,
            typePaths: ['type', 'admin-api', 'common'].map((p) =>
                path.join(__dirname, 'schema', p, '*.graphql'),
            ),
            resolverModule: AdminApiModule,
        })),
        configureGraphQLModule((configService) => ({
            apiType: 'vendor',
            apiPath: configService.vendorApiPath,
            typePaths: ['type', 'vendor-api', 'common'].map((p) =>
                path.join(__dirname, 'schema', p, '*.graphql'),
            ),
            resolverModule: VendorApiModule,
        })),
    ],
    providers: [
        RequestContextService,
        {
            provide: APP_GUARD,
            useClass: AuthGuard,
        },
        {
            provide: APP_INTERCEPTOR,
            useClass: IdInterceptor,
        },
        {
            provide: APP_INTERCEPTOR,
            useClass: ValidateCustomFieldsInterceptor,
        },
        {
            provide: APP_FILTER,
            useClass: ExceptionLoggerFilter,
        },
    ],
})
export class ApiModule {}
