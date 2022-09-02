import fs from 'fs';
import { generate } from '@graphql-codegen/cli';

import * as constants from './constants';
import { getIntrospection, getPath, getSdlFromIntrospection } from './utils';

// Main manager of code generation
export const main = async () => {
  try {
    // Get introspection schemas
    const { adminSchemaJson, shopSchemaJson } = await getIntrospection();

    // Conver jscon schema to sdl schema and save in file
    getSdlFromIntrospection(adminSchemaJson.data, 'admin-schema');
    getSdlFromIntrospection(shopSchemaJson.data, 'shop-schema');

    // Generate operation from schema / typedefs
    const plugins = [
      'typescript',
      'typescript-operations',
      'typescript-react-apollo',
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
        // destination file
        [constants.ADMIN_OPS_OUTPUT_FILE]: {
          // load schemas, the client schema is the same as in vendure
          schema: [constants.ADMIN_SCHEMA_OUTPUT_SDL, constants.CLIENT_SCHEMA],
          documents: [
            {
              // generate the documents for the schema that was generated from the api
              [constants.ADMIN_SCHEMA_OUTPUT_SDL]: {
                loader: constants.DEFINITIONS_LOADER,
              },
            },
            {
              /**
               * generate the documents for the client schema
               * (here we pass the same schema as the previous one, but it is only a workaround since
               *  the loader does not use it, it loads the client schema).
               */
              [constants.ADMIN_SCHEMA_OUTPUT_SDL]: {
                loader: constants.CLIENT_DEFINITIONS_LOADER,
              },
            },
          ],
          plugins,
          config,
        },
        // destination file
        [constants.SHOP_OPS_OUTPUT_FILE]: {
          // load the generated schema
          schema: [constants.SHOP_SCHEMA_OUTPUT_SDL],
          documents: [
            {
              // generate the documents fot the schop schema
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
    fs.writeFileSync(getPath('errors.txt'), `${error}`);
  }
};
