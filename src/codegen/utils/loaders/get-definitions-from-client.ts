import { parse } from "graphql";
//@ts-ignore
import { generateAll } from "gql-generator-node";
import adminSchema from "../client-schema";

export const getDefinitionsFromSdl = async (docString: string) => {
  const operations = generateAll(adminSchema);

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
