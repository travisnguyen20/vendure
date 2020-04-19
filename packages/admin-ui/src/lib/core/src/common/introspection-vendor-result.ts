// tslint:disable


      export interface IntrospectionResultData {
        __schema: {
          types: {
            kind: string;
            name: string;
            possibleTypes: {
              name: string;
            }[];
          }[];
        };
      }
      const result: IntrospectionResultData = {
  "__schema": {
    "types": [
      {
        "kind": "INTERFACE",
        "name": "PaginatedList",
        "possibleTypes": [
          {
            "name": "VendorList"
          },
          {
            "name": "ProductVariantList"
          },
          {
            "name": "AdministratorList"
          },
          {
            "name": "AssetList"
          },
          {
            "name": "OrderList"
          },
          {
            "name": "HistoryEntryList"
          },
          {
            "name": "CollectionList"
          },
          {
            "name": "CountryList"
          },
          {
            "name": "CustomerList"
          },
          {
            "name": "FacetList"
          },
          {
            "name": "ProductList"
          },
          {
            "name": "PromotionList"
          },
          {
            "name": "RoleList"
          },
          {
            "name": "ShippingMethodList"
          },
          {
            "name": "TaxRateList"
          }
        ]
      },
      {
        "kind": "INTERFACE",
        "name": "Node",
        "possibleTypes": [
          {
            "name": "Vendor"
          },
          {
            "name": "User"
          },
          {
            "name": "Role"
          },
          {
            "name": "Channel"
          },
          {
            "name": "Zone"
          },
          {
            "name": "Country"
          },
          {
            "name": "Product"
          },
          {
            "name": "Asset"
          },
          {
            "name": "ProductVariant"
          },
          {
            "name": "TaxRate"
          },
          {
            "name": "TaxCategory"
          },
          {
            "name": "CustomerGroup"
          },
          {
            "name": "ProductOption"
          },
          {
            "name": "FacetValue"
          },
          {
            "name": "Facet"
          },
          {
            "name": "ProductOptionGroup"
          },
          {
            "name": "Collection"
          },
          {
            "name": "Address"
          },
          {
            "name": "Administrator"
          },
          {
            "name": "Cancellation"
          },
          {
            "name": "OrderLine"
          },
          {
            "name": "OrderItem"
          },
          {
            "name": "Fulfillment"
          },
          {
            "name": "Order"
          },
          {
            "name": "Customer"
          },
          {
            "name": "Promotion"
          },
          {
            "name": "Payment"
          },
          {
            "name": "Refund"
          },
          {
            "name": "ShippingMethod"
          },
          {
            "name": "HistoryEntry"
          },
          {
            "name": "PaymentMethod"
          },
          {
            "name": "Return"
          },
          {
            "name": "Sale"
          },
          {
            "name": "StockAdjustment"
          }
        ]
      },
      {
        "kind": "INTERFACE",
        "name": "CustomField",
        "possibleTypes": [
          {
            "name": "BooleanCustomFieldConfig"
          },
          {
            "name": "StringCustomFieldConfig"
          },
          {
            "name": "LocaleStringCustomFieldConfig"
          },
          {
            "name": "IntCustomFieldConfig"
          },
          {
            "name": "FloatCustomFieldConfig"
          },
          {
            "name": "DateTimeCustomFieldConfig"
          }
        ]
      },
      {
        "kind": "INTERFACE",
        "name": "StockMovement",
        "possibleTypes": [
          {
            "name": "Cancellation"
          },
          {
            "name": "Return"
          },
          {
            "name": "Sale"
          },
          {
            "name": "StockAdjustment"
          }
        ]
      },
      {
        "kind": "UNION",
        "name": "CustomFieldConfig",
        "possibleTypes": [
          {
            "name": "StringCustomFieldConfig"
          },
          {
            "name": "LocaleStringCustomFieldConfig"
          },
          {
            "name": "IntCustomFieldConfig"
          },
          {
            "name": "FloatCustomFieldConfig"
          },
          {
            "name": "BooleanCustomFieldConfig"
          },
          {
            "name": "DateTimeCustomFieldConfig"
          }
        ]
      },
      {
        "kind": "UNION",
        "name": "SearchResultPrice",
        "possibleTypes": [
          {
            "name": "PriceRange"
          },
          {
            "name": "SinglePrice"
          }
        ]
      },
      {
        "kind": "UNION",
        "name": "StockMovementItem",
        "possibleTypes": [
          {
            "name": "StockAdjustment"
          },
          {
            "name": "Sale"
          },
          {
            "name": "Cancellation"
          },
          {
            "name": "Return"
          }
        ]
      }
    ]
  }
};
      export default result;
    