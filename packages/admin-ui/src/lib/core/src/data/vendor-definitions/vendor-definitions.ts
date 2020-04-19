import gql from 'graphql-tag';

const ROLE_FRAGMENT = gql`
    fragment Role on Role {
        id
        createdAt
        updatedAt
        code
        description
        permissions
        channels {
            id
            code
            token
        }
    }
`;

export const VENDOR_FRAGMENT = gql`
    fragment Vendor on Vendor {
        id
        createdAt
        updatedAt
        firstName
        lastName
        emailAddress
        user {
            id
            identifier
            lastLogin
            roles {
                ...Role
            }
        }
    }
    ${ROLE_FRAGMENT}
`;

export const GET_VENDORS = gql`
    query GetVendors($options: VendorListOptions) {
        vendors(options: $options) {
            items {
                ...Vendor
            }
            totalItems
        }
    }
    ${VENDOR_FRAGMENT}
`;

export const GET_VENDOR = gql`
    query GetVendor($id: ID!) {
        vendor(id: $id) {
            ...Vendor
        }
    }
    ${VENDOR_FRAGMENT}
`;

export const CREATE_VENDOR = gql`
    mutation CreateVendor($input: CreateVendorInput!) {
        createVendor(input: $input) {
            ...Vendor
        }
    }
    ${VENDOR_FRAGMENT}
`;

export const UPDATE_VENDOR = gql`
    mutation UpdateVendor($input: UpdateVendorInput!) {
        updateVendor(input: $input) {
            ...Vendor
        }
    }
    ${VENDOR_FRAGMENT}
`;

export const ASSIGN_ROLE_TO_VENDOR = gql`
    mutation AssignRoleToVendor($vendorId: ID!, $roleId: ID!) {
        assignRoleToVendor(vendorId: $vendorId, roleId: $roleId) {
            ...Vendor
        }
    }
    ${VENDOR_FRAGMENT}
`;
