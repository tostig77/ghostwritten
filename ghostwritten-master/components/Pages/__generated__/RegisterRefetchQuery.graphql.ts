// deno-lint-ignore-file 
// deno-lint-ignore-file 
/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type RegisterRefetchQueryVariables = {};
export type RegisterRefetchQueryResponse = {
    readonly " $fragmentRefs": FragmentRefs<"Register_query">;
};
export type RegisterRefetchQuery = {
    readonly response: RegisterRefetchQueryResponse;
    readonly variables: RegisterRefetchQueryVariables;
};



/*
query RegisterRefetchQuery {
  ...Register_query
}

fragment Register_query on Query {
  readCurrentUser {
    roles
    id
  }
}
*/

const node: ConcreteRequest = {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "RegisterRefetchQuery",
    "selections": [
      {
        "args": null,
        "kind": "FragmentSpread",
        "name": "Register_query"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "RegisterRefetchQuery",
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
            "name": "id",
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "3c1a3be4e9567db1a2b823600e1d30b7",
    "id": null,
    "metadata": {},
    "name": "RegisterRefetchQuery",
    "operationKind": "query",
    "text": "query RegisterRefetchQuery {\n  ...Register_query\n}\n\nfragment Register_query on Query {\n  readCurrentUser {\n    roles\n    id\n  }\n}\n"
  }
};
(node as any).hash = '83f0103b1b92deb82b1ce903d0268a3e';
export default node;
