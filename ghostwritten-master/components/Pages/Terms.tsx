
import * as React from "react";
import * as ReactHelmet from "react-helmet";

const Lazy = React.lazy(() => import("./Lazy/Terms.tsx"));

export function Helmet() {
    const element: React.ReactElement =
        <ReactHelmet.Helmet>
            <title>Ghostwritten | Terms</title>
        </ReactHelmet.Helmet>;
    return element;
}

export function Headline() {
    const element: React.ReactElement =
        <>
            <span className="ghost-gray">Terms</span>
            <>&nbsp;</>
            of <strong>Service</strong>
        </>;
    return element;
}

export function Page() {
    return <Lazy />;
}
