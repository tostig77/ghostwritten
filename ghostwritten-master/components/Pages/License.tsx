
import * as React from "react";
import * as ReactHelmet from "react-helmet";

const Lazy = React.lazy(() => import("./Lazy/License.tsx"));

export function Helmet() {
    const element: React.ReactElement =
        <ReactHelmet.Helmet>
            <title>Ghostwritten | License</title>
        </ReactHelmet.Helmet>;
    return element;
}

export function Headline() {
    const element: React.ReactElement =
        <>
            <span className="ghost-gray">Copyright</span>
            <>&nbsp;</>
            <strong>License</strong>
        </>;
    return element;
}

export function Page() {
    return <Lazy />;
}