// deno-lint-ignore-file 
/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type OrderRefetchQueryVariables = {
    code: string;
};
export type OrderRefetchQueryResponse = {
    readonly " $fragmentRefs": FragmentRefs<"Order_query">;
};
export type OrderRefetchQuery = {
    readonly response: OrderRefetchQueryResponse;
    readonly variables: OrderRefetchQueryVariables;
};



/*
query OrderRefetchQuery(
  $code: String!
) {
  ...Order_query_4d58ER
}

fragment Order_query_4d58ER on Query {
  readReferrer(code: $code) {
    __typename
    id
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "code"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "code",
    "variableName": "code"
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "OrderRefetchQuery",
    "selections": [
      {
        "args": (v1/*: any*/),
        "kind": "FragmentSpread",
        "name": "Order_query"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "OrderRefetchQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
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
    "cacheID": "a31ec59250a74d70c9fc8a18842f7557",
    "id": null,
    "metadata": {},
    "name": "OrderRefetchQuery",
    "operationKind": "query",
    "text": "query OrderRefetchQuery(\n  $code: String!\n) {\n  ...Order_query_4d58ER\n}\n\nfragment Order_query_4d58ER on Query {\n  readReferrer(code: $code) {\n    __typename\n    id\n  }\n}\n"
  }
};
})();
(node as any).hash = 'bb27d4e4b36c1d9ad8cbad812d79eb64';
export default node;
