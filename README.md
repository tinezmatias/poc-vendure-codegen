# POC of Codegen Graphql and Vendure

How does it work?

if you have a vendure server up and running on localhost on port 8000, this script will download the instrospection, convert it into a graphql schema, then generate the documents / definitions and as a result in the generated folder we will have the operations for the frontend.

## Commands

- yarn ( install dependencies )
- yarn dev ( run the code generator )
