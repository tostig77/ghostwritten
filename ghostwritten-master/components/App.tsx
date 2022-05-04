import * as React from "react";
import { graphql } from "relay-runtime";
import Relay from "react-relay/hooks";
import * as ReactRouter from "react-router-dom";

import {
    Suspense, useRefresh, useStartLoading, useFinishLoading, Client
} from "./Core/Core.tsx";
import { Spinner } from "./Loading.tsx";
import Navbar from "./Navbar.tsx";
import Footer from "./Footer.tsx";

import * as Index from "./Pages/Index.tsx";
import * as Login from "./Pages/Login.tsx";
import * as Register from "./Pages/Register.tsx";
import * as Support from "./Pages/Support.tsx";
import * as Careers from "./Pages/Careers.tsx";
import * as Privacy from "./Pages/Privacy.tsx";
import * as Terms from "./Pages/Terms.tsx";
import * as License from "./Pages/License.tsx";
import * as Order from "./Pages/Order.tsx";
import * as Checkout from "./Pages/Checkout.tsx";
import * as Error from "./Pages/Error.tsx";

import type {
    AppQuery, AppQueryResponse
} from "./__generated__/AppQuery.graphql.ts";
import type {
    AppRefetchQuery
} from "./__generated__/AppRefetchQuery.graphql.ts";
// deno-lint-ignore camelcase
import type { App_query$key } from "./__generated__/App_query.graphql.ts";

const query = graphql`
        query AppQuery {
            ...App_query
        }
    `;

const fragment = graphql`
        fragment App_query on Query
            @refetchable(queryName: "AppRefetchQuery") {
            readCurrentUser {
                roles
                email
            }
        }
    `;

const preloadedQuery =
    Relay.loadQuery<AppQuery>(Client.relayEnvironment, query, {});

interface RootProps {
    data: AppQueryResponse;
}

function Root(props: RootProps) {
    const [refetchData, refetch] =
        Relay.useRefetchableFragment<AppRefetchQuery, App_query$key>(
            fragment, props.data
        );
    const refetchEffect = function () {
        refetch({}, { fetchPolicy: "store-and-network" });
    };
    React.useEffect(refetchEffect, []);

    const element: React.ReactElement =
        <>
            <ReactRouter.Routes>
                <ReactRouter.Route path="/" element={<Index.Helmet />} />
                <ReactRouter.Route
                    path="/login"
                    element={<Login.Helmet />}
                />
                <ReactRouter.Route
                    path="/register"
                    element={<Register.Helmet />}
                />
                <ReactRouter.Route
                    path="/support"
                    element={<Support.Helmet />}
                />
                <ReactRouter.Route
                    path="/careers"
                    element={<Careers.Helmet />}
                />
                <ReactRouter.Route
                    path="/privacy"
                    element={<Privacy.Helmet />}
                />
                <ReactRouter.Route
                    path="/terms"
                    element={<Terms.Helmet />}
                />
                <ReactRouter.Route
                    path="/license"
                    element={<License.Helmet />}
                />
                <ReactRouter.Route
                    path="/order/*
                " element={<Order.Helmet />}
                />
                <ReactRouter.Route
                    path="/checkout"
                    element={<Checkout.Helmet />}
                />
                <ReactRouter.Route path="*" element={
                    <Error.Helmet code={404} text="Not Found" />
                } />
            </ReactRouter.Routes>
            <div className="wrapper">
                <div className="header">
                    <Navbar fragmentRef={refetchData} />
                    <div className="title-wrapper">
                        <h1>
                            <strong>
                                <span>
                                    <span className="ghost-gray">Ghost</span>
                                    written
                                </span>
                            </strong>
                        </h1>
                        <h2>
                            <ReactRouter.Routes>
                                <ReactRouter.Route
                                    path="/"
                                    element={<Index.Headline />}
                                />
                                <ReactRouter.Route
                                    path="/login"
                                    element={<Login.Headline />}
                                />
                                <ReactRouter.Route
                                    path="/register"
                                    element={<Register.Headline />}
                                />
                                <ReactRouter.Route
                                    path="/support"
                                    element={<Support.Headline />}
                                />
                                <ReactRouter.Route
                                    path="/careers"
                                    element={<Careers.Headline />}
                                />
                                <ReactRouter.Route
                                    path="/privacy"
                                    element={<Privacy.Headline />}
                                />
                                <ReactRouter.Route
                                    path="/terms"
                                    element={<Terms.Headline />}
                                />
                                <ReactRouter.Route
                                    path="/license"
                                    element={<License.Headline />}
                                />
                                <ReactRouter.Route
                                    path="/order/*"
                                    element={<Order.Headline />}
                                />
                                <ReactRouter.Route
                                    path="/checkout"
                                    element={<Checkout.Headline />}
                                />
                                <ReactRouter.Route path="*" element={
                                    <Error.Headline
                                        code={404}
                                        text="Not Found"
                                    />
                                } />
                            </ReactRouter.Routes>
                        </h2>
                        <ReactRouter.Routes>
                            <ReactRouter.Route
                                path="/"
                                element={<Index.Button />}
                            />
                            <ReactRouter.Route
                                path="/careers"
                                element={<Careers.Button />}
                            />
                            <ReactRouter.Route path="*" element={<></>} />
                        </ReactRouter.Routes>
                    </div>
                </div>
                <div className="page">
                    <Suspense fallback={<Spinner padding="5rem" />}>
                        <ReactRouter.Routes>
                            <ReactRouter.Route
                                path="/"
                                element={<Index.Page />}
                            />
                            <ReactRouter.Route
                                path="/login"
                                element={<Login.Page />}
                            />
                            <ReactRouter.Route path="/register" element={
                                <Register.Page fragmentRef={refetchData} />
                            } />
                            <ReactRouter.Route
                                path="/support"
                                element={<Support.Page />}
                            />
                            <ReactRouter.Route
                                path="/careers"
                                element={<Careers.Page />}
                            />
                            <ReactRouter.Route
                                path="/privacy"
                                element={<Privacy.Page />}
                            />
                            <ReactRouter.Route
                                path="/terms"
                                element={<Terms.Page />}
                            />
                            <ReactRouter.Route
                                path="/license"
                                element={<License.Page />}
                            />
                            <ReactRouter.Route
                                path="/order/"
                                element={<Order.Page />}
                            />
                            <ReactRouter.Route
                                path="/order/:r
                                eferrer" element={<Order.Page />}
                            />
                            <ReactRouter.Route
                                path="/checkout"
                                element={<Checkout.Page />}
                            />
                            <ReactRouter.Route path="*" element={
                                <Error.Page code={404} text="Not Found" />
                            } />
                        </ReactRouter.Routes>
                    </Suspense>
                </div>
                <Footer />
            </div>
        </>;
    return element;
}

export default function App() {
    /* Obtains refresh JWT. */
    const [loading, refreshEffect] = useRefresh(Client.fetchRefresh);
    React.useEffect(refreshEffect, []);

    /* Handles loading bars. */
    const location = ReactRouter.useLocation();
    const state = location.state as Record<string, unknown> | null;
    if (state && state.redirected) {
        useFinishLoading();
        state.redirected = false;
    }
    React.useState(useStartLoading());
    React.useState(!loading() && useFinishLoading());

    const data = Relay.usePreloadedQuery<AppQuery>(query, preloadedQuery);


    if (loading()) return <Spinner padding="10rem" />;
    else {
        const element: React.ReactElement =
            <Suspense fallback={<Spinner padding="10rem" />}>
                <Root data={data} />
            </Suspense>;
        return element;
    }
}
