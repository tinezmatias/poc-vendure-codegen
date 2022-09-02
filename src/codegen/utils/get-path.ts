import path from "path";

export const getPath = (filename: string) =>
  path.join(__dirname, `../../generated/${filename}`);

export const getClientSchemaPath = () =>
  path.join(__dirname, "../utils/client-schema/index.ts");

export const getClientLoaderPath = () =>
  path.join(__dirname, "../utils/loaders/get-definitions-from-client.ts");

export const getDefinitionLoaderPath = () =>
  path.join(__dirname, "../utils/loaders/get-definitions-from-schema.ts");
