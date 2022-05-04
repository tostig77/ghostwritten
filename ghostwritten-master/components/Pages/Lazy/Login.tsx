
import * as React from "react";
import Relay from "react-relay/hooks";
import { graphql } from "relay-runtime";
import * as ReactRouter from "react-router-dom";

import {
    environment,
    Environment,
    useToken,
    Console,
    useStartLoading,
    useFinishLoading
} from "../../Core/Core.tsx";
import type {
    LoginMutationResponse
} from "./__generated__/LoginMutation.graphql.ts";

interface Value {
    value: string;
}

const mutation = graphql`
            mutation LoginMutation($input: LoginUserInput!) {
                loginUser(input: $input)
            }
        `;

export default function Login() {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [error, setError] = React.useState(false);

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
                "password": password
            }
        };

        const onCompleted = function (data: unknown) {
            useToken((data as LoginMutationResponse).loginUser);
            navigate("/", { state: { redirected: true } });
            navigate(0);
        };

        const onError = function (error: Error) {
            Console.error(error);
            useFinishLoading();
            setPassword("");
            setError(true);
        };

        useStartLoading();
        commit({
            variables: variables,
            onCompleted: onCompleted,
            onError: onError
        });
    }

    const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const emailValid = emailRegex.test(email);
    const complete = email.length > 0 && password.length > 0 && emailValid;

    const element: React.ReactElement =
        <div className="form-wrapper">
            <form className="order" onSubmit={onSubmit}>
                {
                    error &&
                    <>
                        <h1>
                            <span className="info required">
                                <strong>Invalid login credentials.</strong>
                            </span>
                        </h1>
                        <br />
                    </>
                }
                <h1>
                    <strong>Email</strong>
                    <span className="info required">(required)</span>
                </h1>
                <div className="form-item-wrapper">
                    <input
                        type="text" id="email" name="email" required
                        placeholder="email@example.com"
                        autoComplete="email"
                        onChange=
                        {
                            function (event) {
                                setEmail(
                                    (event.target as
                                        (typeof event.target & Value))
                                        .value.trim().toLowerCase()
                                );
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
                <h1>
                    <strong>Password</strong>
                    <span className="info required">(required)</span>
                </h1>
                <div className="form-item-wrapper">
                    <input
                        type="password" id="password" name="password"
                        autoComplete="current-password" required
                        onChange={function (event) {
                            setPassword(
                                (event.target as (typeof event.target & Value))
                                    .value.trim()
                            );
                        }}
                        value={password}
                    />
                </div>
                <div className="form-item-wrapper">
                    <input type="submit" value="Confirm"
                        className={complete ? "button shadow" : "button"}
                    />
                </div>
            </form>
        </div>;
    return element;
}
