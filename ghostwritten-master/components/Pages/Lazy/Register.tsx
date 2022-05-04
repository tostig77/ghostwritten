
import * as React from "react";
import Relay from "react-relay/hooks";
import { graphql } from "relay-runtime";
import * as ReactRouter from "react-router-dom";

import {
    environment, Environment, Console, useStartLoading, useFinishLoading
} from "../../Core/Core.tsx";

// deno-lint-ignore camelcase
import type { App_query } from "../../__generated__/App_query.graphql.ts";
import type {
    RegisterMutationResponse
} from "./__generated__/RegisterMutation.graphql.ts";

const mutation = graphql`
        mutation RegisterMutation($input: CreateUserInput!) {
            createUser(input: $input) {
                id
            }
        }
    `;

enum UserType {
    Standard,
    Admin,
}

interface Value {
    value: string;
}
interface Props {
    data: App_query;
}
export default function Register(props: Props) {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [passwordConf, setPasswordConf] = React.useState("");
    const [error, setError] = React.useState(false);
    const [userType, setUserType] = React.useState(UserType.Standard);

    const [commit, isInFlight] = Relay.useMutation(mutation);
    const navigate = ReactRouter.useNavigate();

    function onSubmit(event: React.FormEvent<HTMLFormElement>): void {
        event.preventDefault();
        switch (environment()) {
            case Environment.SERVER:
                return;
            case Environment.CLIENT:
                break;
        }

        if (!complete)
            return;

        const variables = {
            "input": {
                "email": email,
                "password": password,
                "roles": [] as string[],
            }
        };

        switch (userType) {
            case UserType.Admin:
                variables["input"]["roles"] = ["Admin"];
                break;
            case UserType.Standard:
                break;
        }

        const onCompleted = function (data: unknown) {
            const response = data as RegisterMutationResponse;
            Console.log(`Created user with id: ${response.createUser.id}`);
            navigate("/login", { state: { redirected: true } });
        };

        const onError = function (error: Error) {
            Console.error(error);
            useFinishLoading();
            setPasswordConf("");
            setError(true);
        };

        useStartLoading();
        commit({ variables: variables, onCompleted: onCompleted, onError: onError });
    }

    const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const emailValid = emailRegex.test(email);
    const lengthsValid = email.length > 0 && password.length > 0 && passwordConf.length > 0;
    const passwordValid = password === passwordConf;
    const complete = emailValid && lengthsValid && passwordValid;

    const element: React.ReactElement =
        <div className="form-wrapper">
            <form className="order" onSubmit={onSubmit}>
                {
                    error &&
                    <>
                        <h1>
                            <span className="info required">
                                <strong>The email {email} is taken.</strong>
                            </span>
                        </h1>
                        <br />
                    </>
                }
                <h1><strong>Email</strong><span className="info required">(required)</span></h1>
                <div className="form-item-wrapper">
                    <input
                        type="text" id="email" name="email" required
                        placeholder="email@example.com"
                        autoComplete="email"
                        onChange=
                        {
                            function (event) {
                                setEmail((event.target as (typeof event.target & Value)).value.trim().toLowerCase());
                                setError(false);
                            }
                        }
                        value={email}
                    />
                </div>
                {
                    email.length > 0 && !emailValid &&
                    <>
                        <h1>
                            <span className="info required">
                                <strong>Please enter a valid email.</strong>
                            </span>
                        </h1>
                        <br />
                    </>
                }
                <h1><strong>Password</strong><span className="info required">(required)</span></h1>
                <div className="form-item-wrapper">
                    <input
                        type="password" id="password" name="password" autoComplete="new-password" required
                        onChange={function (event) { setPassword((event.target as (typeof event.target & Value)).value.trim()); }}
                        value={password}
                    />
                </div>
                <h1><strong>Confirm password</strong><span className="info required">(required)</span></h1>
                <div className="form-item-wrapper">
                    <input
                        type="password" id="password-conf" name="password-conf" autoComplete="" required
                        onChange={function (event) { setPasswordConf((event.target as (typeof event.target & Value)).value.trim()); }}
                        value={passwordConf}
                    />
                </div>
                {
                    password.length > 0 && passwordConf.length > 0 && !passwordValid &&
                    <>
                        <h1>
                            <span className="info required">
                                <strong>Passwords do not match.</strong>
                            </span>
                        </h1>
                        <br />
                    </>
                }
                {
                    props.data.readCurrentUser?.roles?.includes("ADMIN") ?
                        <>
                            <h1><strong>User type</strong><span className="info required">(required)</span></h1>
                            <div className="form-item-wrapper">
                                <input
                                    type="radio" id="radio-standard" name="user-type" required checked
                                    onChange={function () { setUserType(UserType.Standard); }}
                                />
                                <label className="radio" htmlFor="radio-standard">Standard</label>
                                <input
                                    type="radio" id="radio-admin" name="user-type" required
                                    onChange={function () { setUserType(UserType.Admin); }}
                                />
                                <label className="radio" htmlFor="radio-admin">Admin</label>
                            </div>
                        </> :
                        <></>
                }
                <div className="form-item-wrapper">
                    <input type="submit" value="Confirm"
                        className={complete ? "button shadow" : "button"}
                    />
                </div>
            </form>
        </div>;
    return element;
}
