// deno-lint-ignore-file 
/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type Order_query = {
    readonly readReferrer: {
        readonly __typename: string;
    } | null;
    readonly " $refType": "Order_query";
};
export type Order_query$data = Order_query;
export type Order_query$key = {
    readonly " $data"?: Order_query$data;
    readonly " $fragmentRefs": FragmentRefs<"Order_query">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "code"
    }
  ],
  "kind": "Fragment",
  "metadata": {
    "refetch": {
      "connection": null,
      "fragmentPathInResult": [],
      "operation": require('./OrderRefetchQuery.graphql.ts')
    }
  },
  "name": "Order_query",
  "selections": [
    {
      "alias": null,
      "args": [
        {
          "kind": "Variable",
          "name": "code",
          "variableName": "code"
        }
      ],
      "concreteType": "Referrer",
      "kind": "LinkedField",
      "name": "readReferrer",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "__typename",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Query",
  "abstractKey": null
};
(node as any).hash = 'bb27d4e4b36c1d9ad8cbad812d79eb64';
export default node;
