
import * as React from "react";
import * as ReactHelmet from "react-helmet";

const Lazy = React.lazy(() => import("./Lazy/Support.tsx"));

export function Helmet() {
    const element: React.ReactElement =
        <ReactHelmet.Helmet>
            <title>Ghostwritten | Support</title>
        </ReactHelmet.Helmet>;
    return element;
}

export function Headline() {
    const element: React.ReactElement =
        <>
            <span className="ghost-gray">Contact</span>
            <>&nbsp;</>
            <strong>us</strong>.
        </>;
    return element;
}

export function Page() {
    return <Lazy />;
}