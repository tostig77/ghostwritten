// deno-lint-ignore-file 
/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type Roles = "ADMIN" | "%future added value";
export type App_query = {
    readonly readCurrentUser: {
        readonly roles: ReadonlyArray<Roles>;
        readonly email: string;
    } | null;
    readonly " $refType": "App_query";
};
export type App_query$data = App_query;
export type App_query$key = {
    readonly " $data"?: App_query$data;
    readonly " $fragmentRefs": FragmentRefs<"App_query">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": {
    "refetch": {
      "connection": null,
      "fragmentPathInResult": [],
      "operation": require('./AppRefetchQuery.graphql.ts')
    }
  },
  "name": "App_query",
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
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "email",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Query",
  "abstractKey": null
};
(node as any).hash = 'e22105f2ff6e9f80da0d9246b11329d5';
export default node;
