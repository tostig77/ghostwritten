
import * as React from "react";
import MediaQuery from "react-responsive";
import * as ReactHelmet from "react-helmet";

import { environment, Environment } from "../Core/Core.tsx";

let Stripe: typeof import("@stripe/stripe-js") | undefined = undefined;
const stripeKey = "pk_test_51IPELvBCMz7QpSOWDOXR1BzczWDxi6ZqkJtiE6MN3grVjhk7L512MLB1ZSDwmRv1GNQbU2Mpnfo2SSCwNvxzr8mX00ZbZlstKm";

export function Helmet() {
    const element: React.ReactElement =
        <ReactHelmet.Helmet>
            <title>Ghostwritten | Checkout</title>
        </ReactHelmet.Helmet>;
    return element;
}

export function Headline() {
    const element: React.ReactElement =
        <>
            <span className="ghost-gray">Pay with</span>
            <MediaQuery maxWidth={399}><br /></MediaQuery>
            <MediaQuery minWidth={400}><>&nbsp;</></MediaQuery>
            <strong>credit</strong> or <strong>debit</strong>.
        </>;
    return element;
}

export function Page() {
    async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        switch (environment()) {
            case Environment.SERVER:
                return;
            case Environment.CLIENT:
                break;
        }
        if (!Stripe) {
            Stripe = await import("@stripe/stripe-js");
            await Stripe.loadStripe(stripeKey);
        }
    }
    const element: React.ReactElement =
        <div className="main-text">
            <h1>100% secure</h1>
            <p>
                Payments are done through <a href="https://stripe.com">Stripe</a>,
                a secure, reputable online payments facilitator
                used by companies such as Amazon, Google, and Lyft.
            </p>
            <p>
                Our team will contact you quickly by email to
                confirm receipt of any payments for your order.
            </p>
        </div>;
    return element;
}