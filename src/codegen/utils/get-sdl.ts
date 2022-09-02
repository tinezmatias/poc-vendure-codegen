import fs from 'fs';
import { buildClientSchema, printSchema } from 'graphql';

import { getPath } from './get-path';

export const getSdlFromIntrospection = (rawJson: any, name?: string) => {
  const sdl = buildClientSchema(rawJson);

  if (name) {
    fs.writeFileSync(getPath(`schemas/${name}.graphql`), printSchema(sdl));
  }

  return sdl;
};
