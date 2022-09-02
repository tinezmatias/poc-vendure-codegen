import fs from 'fs';
import axios from 'axios';
import { getIntrospectionQuery } from 'graphql';

/**
 * Makes an introspection query to the Vendure server and writes the result to a
 * schema.json file.
 *
 * If there is an error connecting to the server, the promise resolves to false.
 */
export const getIntrospectionSchema = async (
  apiPath: string,
  outputFilePath: string,
  port: string
) => {
  try {
    const url = `http://localhost:${port}/${apiPath}`;
    const body = JSON.stringify({ query: getIntrospectionQuery() });
    const options = {
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(body),
      },
    };

    // Query
    const result = await axios.post(url, body, options);

    // Save file
    fs.writeFileSync(outputFilePath, JSON.stringify(result.data));

    return true;
  } catch (error: any) {
    if (error.code === 'ECONNREFUSED') {
      console.error(
        `ERROR: Could not connect to the Vendure server at http://localhost:${port}/${apiPath}`
      );
    } else {
      console.log('Error in dowload', error.message);
    }
  }
};
