// deno-lint-ignore-file 
/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type AppRefetchQueryVariables = {};
export type AppRefetchQueryResponse = {
    readonly " $fragmentRefs": FragmentRefs<"App_query">;
};
export type AppRefetchQuery = {
    readonly response: AppRefetchQueryResponse;
    readonly variables: AppRefetchQueryVariables;
};



/*
query AppRefetchQuery {
  ...App_query
}

fragment App_query on Query {
  readCurrentUser {
    roles
    email
    id
  }
}
*/

const node: ConcreteRequest = {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "AppRefetchQuery",
    "selections": [
      {
        "args": null,
        "kind": "FragmentSpread",
        "name": "App_query"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "AppRefetchQuery",
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
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "id",
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "f655b1a5f21a10ae677116cd08c84d8d",
    "id": null,
    "metadata": {},
    "name": "AppRefetchQuery",
    "operationKind": "query",
    "text": "query AppRefetchQuery {\n  ...App_query\n}\n\nfragment App_query on Query {\n  readCurrentUser {\n    roles\n    email\n    id\n  }\n}\n"
  }
};
(node as any).hash = 'e22105f2ff6e9f80da0d9246b11329d5';
export default node;
