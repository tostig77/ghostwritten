
import * as React from "react";
import * as ReactHelmet from "react-helmet";

const Lazy = React.lazy(() => import("./Lazy/Order.tsx"));

export function Helmet() {
    const element: React.ReactElement =
        <ReactHelmet.Helmet>
            <title>Ghostwritten | Order</title>
        </ReactHelmet.Helmet>;
    return element;
}

export function Headline() {
    const element: React.ReactElement =
        <>
            <span className="ghost-gray">Select</span>
            <>&nbsp;</>
            your <strong>essay</strong>.
        </>;
    return element;
}

export function Page() {
    return <Lazy />;
}
