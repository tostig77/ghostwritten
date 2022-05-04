
import * as React from "react";
import MediaQuery from "react-responsive";
import * as ReactHelmet from "react-helmet";

// deno-lint-ignore camelcase
import type { App_query } from "../__generated__/App_query.graphql.ts";

const Lazy = React.lazy(() => import("./Lazy/Register.tsx"));

export function Helmet() {
    const element: React.ReactElement =
        <ReactHelmet.Helmet>
            <title>Ghostwritten | Register</title>
        </ReactHelmet.Helmet>;
    return element;
}

export function Headline() {
    const element: React.ReactElement =
        <>
            <span className="ghost-gray">Register</span>
            <MediaQuery maxWidth={399}><br /></MediaQuery>
            <MediaQuery minWidth={400}><>&nbsp;</></MediaQuery>
            for an <strong>account</strong>.
        </>;
    return element;
}

interface Props {
    fragmentRef: App_query;
}
export function Page(props: Props) {
    return <Lazy data={props.fragmentRef} />;
}
