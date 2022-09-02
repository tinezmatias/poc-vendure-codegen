import fs from "fs";
import { generate } from "@graphql-codegen/cli";

import * as constants from "./constants";
import { getIntrospection, getPath, getSdlFromIntrospection } from "./utils";

// Main manager of code generation
export const main = async () => {
  try {
    // Get introspection schemas
    const { adminSchemaJson, shopSchemaJson } = await getIntrospection();

    // Conver jscon schema to sdl schema and save in file
    getSdlFromIntrospection(adminSchemaJson.data, "admin-schema");
    getSdlFromIntrospection(shopSchemaJson.data, "shop-schema");

    // Generate operation from schema / typedefs
    const plugins = [
      "typescript",
      "typescript-operations",
      "typescript-react-apollo",
    ];

    const config = {
      skipTypeNameForRoot: true,
      withHooks: true,
      withComponent: false,
      withHOC: false,
    };

    await generate({
      overwrite: true,
      generates: {
        [constants.ADMIN_OPS_OUTPUT_FILE]: {
          schema: [constants.ADMIN_SCHEMA_OUTPUT_SDL, constants.CLIENT_SCHEMA],
          documents: [
            {
              [constants.ADMIN_SCHEMA_OUTPUT_SDL]: {
                loader: constants.DEFINITIONS_LOADER,
              },
            },
            {
              [constants.ADMIN_SCHEMA_OUTPUT_SDL]: {
                loader: constants.CLIENT_DEFINITIONS_LOADER,
              },
            },
          ],
          plugins,
          config,
        },
        [constants.SHOP_OPS_OUTPUT_FILE]: {
          schema: [constants.SHOP_SCHEMA_OUTPUT_SDL],
          documents: [
            {
              [constants.SHOP_SCHEMA_OUTPUT_SDL]: {
                loader: constants.DEFINITIONS_LOADER,
              },
            },
          ],
          plugins,
          config,
        },
      },
    });

    return;
  } catch (error) {
    fs.writeFileSync(getPath("errors.txt"), `${error}`);
  }
};
