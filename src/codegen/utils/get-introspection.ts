import fs from "fs";

import { getIntrospectionSchema } from "./download-introspection-schema";
import {
  SHOP_API_NAME,
  ADMIN_API_NAME,
  API_PORT,
  ADMIN_SCHEMA_OUTPUT_JSON,
  SHOP_SCHEMA_OUTPUT_JSON,
} from "../constants/index";

export const getIntrospection = async () => {
  try {
    // Download from the server and save the schemas as json
    const shopResult = await getIntrospectionSchema(
      SHOP_API_NAME,
      SHOP_SCHEMA_OUTPUT_JSON,
      API_PORT
    );

    const adminResult = await getIntrospectionSchema(
      ADMIN_API_NAME,
      ADMIN_SCHEMA_OUTPUT_JSON,
      API_PORT
    );

    if (!shopResult || !adminResult) {
      throw new Error(
        "Attempting to generate types from existing schema json files..."
      );
    }
  } catch (error: any) {
    console.log("Error in introspection", error.message);
  } finally {
    const adminSchemaJson = JSON.parse(
      fs.readFileSync(ADMIN_SCHEMA_OUTPUT_JSON, "utf-8")
    );

    const shopSchemaJson = JSON.parse(
      fs.readFileSync(SHOP_SCHEMA_OUTPUT_JSON, "utf-8")
    );

    return {
      adminSchemaJson,
      shopSchemaJson,
    };
  }
};
