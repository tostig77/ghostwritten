// deno-lint-ignore-file 
/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type OrderQueryVariables = {
    code: string;
};
export type OrderQueryResponse = {
    readonly " $fragmentRefs": FragmentRefs<"Order_query">;
};
export type OrderQuery = {
    readonly response: OrderQueryResponse;
    readonly variables: OrderQueryVariables;
};



/*
query OrderQuery(
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
    "name": "OrderQuery",
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
    "name": "OrderQuery",
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
    "cacheID": "c5b545cdd35c69a32ad9aad0e44a1ac0",
    "id": null,
    "metadata": {},
    "name": "OrderQuery",
    "operationKind": "query",
    "text": "query OrderQuery(\n  $code: String!\n) {\n  ...Order_query_4d58ER\n}\n\nfragment Order_query_4d58ER on Query {\n  readReferrer(code: $code) {\n    __typename\n    id\n  }\n}\n"
  }
};
})();
(node as any).hash = '8f5184e2ad9c1ef6d43d1b3a1ec07b9e';
export default node;
