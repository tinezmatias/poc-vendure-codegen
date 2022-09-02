import { parse } from "graphql";
//@ts-ignore
import { generateAll } from "gql-generator-node";
import getSchema from "./get-schema";

export const getDefinitionsFromSdl = async (docString: string) => {
  const schema = getSchema(docString);
  const operations = generateAll(schema);

  let definitionsString = "";

  // For each operation, parse the query and add it to the definitionsString
  for (const key in operations) {
    if (Object.hasOwnProperty.call(operations, key)) {
      const operation = operations[key];

      for (const key in operation) {
        if (Object.hasOwnProperty.call(operation, key)) {
          const element = operation[key];
          definitionsString += element;
        }
      }
    }
  }

  return parse(definitionsString);
};

export default getDefinitionsFromSdl;
