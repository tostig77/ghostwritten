// deno-lint-ignore-file 
/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type SendEmailInput = {
    from: string;
    to: Array<string>;
    replyTo?: string | null;
    subject: string;
    text: string;
    html: string;
};
export type OrderMutationVariables = {
    input: SendEmailInput;
};
export type OrderMutationResponse = {
    readonly sendEmail: boolean;
};
export type OrderMutation = {
    readonly response: OrderMutationResponse;
    readonly variables: OrderMutationVariables;
};



/*
mutation OrderMutation(
  $input: SendEmailInput!
) {
  sendEmail(input: $input)
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
    "kind": "ScalarField",
    "name": "sendEmail",
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "OrderMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "OrderMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "5a5a866ff3f650748eada850894d6b45",
    "id": null,
    "metadata": {},
    "name": "OrderMutation",
    "operationKind": "mutation",
    "text": "mutation OrderMutation(\n  $input: SendEmailInput!\n) {\n  sendEmail(input: $input)\n}\n"
  }
};
})();
(node as any).hash = 'c45141e554b5ebbe6c1258a2dc1b58ae';
export default node;
