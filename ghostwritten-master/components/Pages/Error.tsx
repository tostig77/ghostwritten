
import * as React from "react";
import * as ReactHelmet from "react-helmet";

interface Props {
    code: number;
    text: string;
}

export function Helmet(props: Props) {
    const element: React.ReactElement =
        <ReactHelmet.Helmet>
            <title>Ghostwritten | {props.text}</title>
        </ReactHelmet.Helmet>;
    return element;
}

export function Headline(props: Props) {
    const element: React.ReactElement =
        <>
            <span className="ghost-gray">{props.code}</span>
            <>&nbsp;</>
            <strong>{props.text}</strong>
        </>;
    return element;
}

export function Page(props: Props) {
    return <></>;
}
