
import * as React from "react";

interface Props {
    size?: string;
    padding?: string;
}
export function Spinner(props: Props) {
    const size = props.size ?? "7rem";
    const border = `${parseInt(size.replaceAll("rem", "")) / 5.6}rem`;
    const element =
        <div className="load-spinner-wrapper" style={{
            padding: props.padding
        }}>
            <div
                className="load-spinner"
                style={{ width: size, height: size }}
            >
                <div className="inner one" style={{
                    borderBottom: `${border} solid #99a3ff`
                }}></div>
                <div className="inner two" style={{
                    borderRight: `${border} solid #6d76c9`
                }}></div>
                <div className="inner three" style={{
                    borderTop: `${border} solid #3d4691`
                }}></div>
            </div>
        </div>;
    return element;
}
