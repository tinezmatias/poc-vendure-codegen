import {
  getPath,
  getClientSchemaPath,
  getClientLoaderPath,
  getDefinitionLoaderPath,
} from "../utils/get-path";

// Api
export const SHOP_API_NAME = "shop-api";
export const ADMIN_API_NAME = "admin-api";
export const API_PORT = "8000";

// Final paths SCHEMAS
export const SHOP_SCHEMA_OUTPUT_JSON = getPath("schemas/shop-schema.json");
export const SHOP_SCHEMA_OUTPUT_SDL = getPath("schemas/shop-schema.graphql");
export const ADMIN_SCHEMA_OUTPUT_JSON = getPath("schemas/admin-schema.json");
export const ADMIN_SCHEMA_OUTPUT_SDL = getPath("schemas/admin-schema.graphql");

// Final paths OPERATIONS
export const SHOP_OPS_OUTPUT_FILE = getPath("operations/shop-operations.tsx");
export const ADMIN_OPS_OUTPUT_FILE = getPath("operations/admin-operations.tsx");

// Definitions loaders
export const DEFINITIONS_LOADER = getDefinitionLoaderPath();
export const CLIENT_DEFINITIONS_LOADER = getClientLoaderPath();

// Client schema loader
export const CLIENT_SCHEMA = getClientSchemaPath();
