// deno-lint-ignore-file 
/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type NavbarMutationVariables = {};
export type NavbarMutationResponse = {
    readonly logoutUser: boolean;
};
export type NavbarMutation = {
    readonly response: NavbarMutationResponse;
    readonly variables: NavbarMutationVariables;
};



/*
mutation NavbarMutation {
  logoutUser
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "logoutUser",
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "NavbarMutation",
    "selections": (v0/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "NavbarMutation",
    "selections": (v0/*: any*/)
  },
  "params": {
    "cacheID": "2076454df5d4b91858320634a13a350b",
    "id": null,
    "metadata": {},
    "name": "NavbarMutation",
    "operationKind": "mutation",
    "text": "mutation NavbarMutation {\n  logoutUser\n}\n"
  }
};
})();
(node as any).hash = '9eb5012552b54ab046ffcaa43daa11ba';
export default node;
