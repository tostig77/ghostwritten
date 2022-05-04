// deno-lint-ignore-file 
// deno-lint-ignore-file 
/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type Roles = "ADMIN" | "%future added value";
export type Register_query = {
    readonly readCurrentUser: {
        readonly roles: ReadonlyArray<Roles>;
    } | null;
    readonly " $refType": "Register_query";
};
export type Register_query$data = Register_query;
export type Register_query$key = {
    readonly " $data"?: Register_query$data;
    readonly " $fragmentRefs": FragmentRefs<"Register_query">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": {
    "refetch": {
      "connection": null,
      "fragmentPathInResult": [],
      "operation": require('./RegisterRefetchQuery.graphql.ts')
    }
  },
  "name": "Register_query",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "User",
      "kind": "LinkedField",
      "name": "readCurrentUser",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "roles",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Query",
  "abstractKey": null
};
(node as any).hash = '83f0103b1b92deb82b1ce903d0268a3e';
export default node;
