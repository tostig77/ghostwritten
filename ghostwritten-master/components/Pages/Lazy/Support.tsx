
import * as React from "react";

export default function () {
    const email =
        <a href="mailto:support@ghostwritten.io">support@ghostwritten.io</a>;
    const element: React.ReactElement =
        <div className="main-text">
            <h1>We're here to help</h1>
            <p>
                We aim to provide the best for our customers. If you
                were not satisfied with your experience, or if you
                are having issues with the website, feel free to reach
                out to us via email at {email} and our support team
                will do our best to help you immediately.
            </p>
        </div>;
    return element;
}
