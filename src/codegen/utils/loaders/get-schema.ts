import fs from "fs";
import { makeExecutableSchema } from "graphql-tools";

function loadGraphQL(filePath: string): string {
  return fs.readFileSync(filePath, "utf8");
}

export function getSchema(file: string) {
  const schemaString = loadGraphQL(file);

  const schema = makeExecutableSchema({
    typeDefs: [schemaString],
  });

  return schema;
}

export default getSchema;
