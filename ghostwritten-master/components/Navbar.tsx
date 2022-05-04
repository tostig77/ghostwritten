
import * as React from "react";
import MediaQuery from "react-responsive";
import { graphql } from "relay-runtime";
import Relay from "react-relay/hooks";
import * as ReactRouter from "react-router-dom";

import Logo from "./Logo.tsx";
import { Spinner } from "./Loading.tsx";
import { Suspense, Console, useToken } from "./Core/Core.tsx";

// deno-lint-ignore camelcase
import type { App_query } from "./__generated__/App_query.graphql.ts";

const mutation = graphql`
        mutation NavbarMutation {
            logoutUser
        }
    `;

interface NavbarQueryProps {
    fragmentRef: App_query;
}

function LogoutButton(props: NavbarQueryProps) {
    const navigate = ReactRouter.useNavigate();
    const [commit, isInFlight] = Relay.useMutation(mutation);

    const onCompleted = function (_data: unknown) {
        useToken(null);
        navigate(0);
    };
    const onError = function (error: Error) {
        Console.error(error);
    };
    const onClick = function () {
        commit({ variables: {}, onCompleted: onCompleted, onError: onError });
    };

    const element: React.ReactElement =
        <>
            {props.fragmentRef.readCurrentUser?.roles?.includes("ADMIN") &&
                <ReactRouter.Link to="/admin">Admin</ReactRouter.Link>}
            <span className="link" onClick={onClick}>Logout</span>
        </>;
    return element;
}

function LoginLinks(props: NavbarQueryProps) {

    const element: React.ReactElement =
        props.fragmentRef.readCurrentUser ?
            <LogoutButton {...props} /> :
            <ReactRouter.Link to="/login">Login</ReactRouter.Link>;
    return element;
}

interface Props {
    fragmentRef: App_query;
}
export default function Navbar(props: Props) {
    const element: React.ReactElement =
        <div className="nav-wrapper">
            <nav>
                <ReactRouter.Link to="/" className="home">
                    <Logo /> Home
                </ReactRouter.Link>
                <MediaQuery maxWidth={768}>
                    <svg stroke="currentColor" fill="none" viewBox="0 0 24 24" height="1.5rem" width="1.5rem" >
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h7">
                        </path>
                    </svg>
                </MediaQuery>
                <MediaQuery minWidth={769}>
                    <Suspense fallback={<Spinner size="3rem" />}>
                        <div className="links">
                            <LoginLinks fragmentRef={props.fragmentRef} />
                        </div>
                    </Suspense>
                </MediaQuery>
            </nav>
        </div>;
    return element;
}