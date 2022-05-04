// deno-lint-ignore-file 
/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type Roles = "ADMIN" | "%future added value";
export type CreateUserInput = {
    email: string;
    password: string;
    roles?: Array<Roles> | null;
};
export type RegisterMutationVariables = {
    input: CreateUserInput;
};
export type RegisterMutationResponse = {
    readonly createUser: {
        readonly id: string;
    };
};
export type RegisterMutation = {
    readonly response: RegisterMutationResponse;
    readonly variables: RegisterMutationVariables;
};



/*
mutation RegisterMutation(
  $input: CreateUserInput!
) {
  createUser(input: $input) {
    id
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "input"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "input",
        "variableName": "input"
      }
    ],
    "concreteType": "User",
    "kind": "LinkedField",
    "name": "createUser",
    "plural": false,
    "selections": [
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
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "RegisterMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "RegisterMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "fdeefbcd20ee29729f1439775ab81cfe",
    "id": null,
    "metadata": {},
    "name": "RegisterMutation",
    "operationKind": "mutation",
    "text": "mutation RegisterMutation(\n  $input: CreateUserInput!\n) {\n  createUser(input: $input) {\n    id\n  }\n}\n"
  }
};
})();
(node as any).hash = 'c46e1943871a3a0dac6455e6baf5dd6a';
export default node;
