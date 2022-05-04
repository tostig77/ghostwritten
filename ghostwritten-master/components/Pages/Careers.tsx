
import * as React from "react";
import MediaQuery from "react-responsive";
import * as ReactHelmet from "react-helmet";

const Lazy = React.lazy(() => import("./Lazy/Careers.tsx"));

export function Helmet() {
    const element: React.ReactElement =
        <ReactHelmet.Helmet>
            <title>Ghostwritten | Careers</title>
        </ReactHelmet.Helmet>;
    return element;
}

export function Button() {
    const element =
        <div className="button-wrapper">
            <a className="button shadow" href="mailto:careers@ghostwritten.io">
                Contact Us
            </a>
        </div>;
    return element;
}

export function Headline() {
    const element: React.ReactElement =
        <>
            <span className="ghost-gray">Become a</span>
            <MediaQuery maxWidth={399}><br /></MediaQuery>
            <MediaQuery minWidth={400}><>&nbsp;</></MediaQuery>
            <strong>Ghostwriter</strong>.
        </>;
    return element;
}

export function Page() {
    return <Lazy />;
}
