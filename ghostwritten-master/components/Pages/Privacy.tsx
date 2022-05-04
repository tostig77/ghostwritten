
import * as React from "react";
import * as ReactHelmet from "react-helmet";

const Lazy = React.lazy(() => import("./Lazy/Privacy.tsx"));

export function Helmet() {
    const element: React.ReactElement =
        <ReactHelmet.Helmet>
            <title>Ghostwritten | Privacy</title>
        </ReactHelmet.Helmet>;
    return element;
}

export function Headline() {
    const element: React.ReactElement =
        <>
            <span className="ghost-gray">Privacy</span>
            <>&nbsp;</>
            <strong>Policy</strong>
        </>;
    return element;
}

export function Page() {
    return <Lazy />;
}
