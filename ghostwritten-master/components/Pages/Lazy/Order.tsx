
import * as React from "react";
import { graphql } from "relay-runtime";
import Relay from "react-relay/hooks";
import * as ReactRouter from "react-router-dom";

import {
    environment, Environment, Console, useStartLoading
} from "../../../components/Core/Core.tsx";
import { Spinner } from "../../Loading.tsx";
import type {
    OrderMutationResponse
} from "./__generated__/OrderMutation.graphql.ts";
import type { OrderQuery } from "./__generated__/OrderQuery.graphql.ts";
// deno-lint-ignore camelcase
import type { Order_query$key, } from "./__generated__/Order_query.graphql.ts";
import type {
    OrderRefetchQuery
} from "./__generated__/OrderRefetchQuery.graphql.ts";

const query = graphql`
        query OrderQuery($code: String!) {
            ...Order_query @arguments(code: $code)
        }
    `;

const fragment = graphql`
        fragment Order_query on Query 
        @argumentDefinitions(code: { type: "String!" }) 
        @refetchable(queryName: "OrderRefetchQuery") {
            readReferrer(code: $code) {
                __typename
            }
        }
    `;

const mutation = graphql`
        mutation OrderMutation($input: SendEmailInput!) { 
            sendEmail(input: $input)
        }
    `;

enum Status {
    form,
    loading,
    success,
    failure,
}

type ServiceType = "unknown" | "tutoring" | "essay" | "college application";

interface Value {
    value: string;
}

interface FormProps {
    onSubmit: (mutations: Relay.Variables[]) => void;
}

function Form(props: FormProps) {
    const location = ReactRouter.useLocation();
    const params = ReactRouter.useParams();
    const navigate = ReactRouter.useNavigate();

    const [serviceType, setServiceType] = React.useState<ServiceType>("unknown");
    const [details, setDetails] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [referral, setReferral] = React.useState(params.referrer ?? "");
    const [error, setError] = React.useState(false);
    const [refetched, setRefetched] = React.useState(false);

    const fragmentRef =
        params.referrer ?
            Relay.useLazyLoadQuery<OrderQuery>(
                query, { code: params.referrer }
            ) : null;
    const [data, refetch] =
        Relay.useRefetchableFragment<OrderRefetchQuery, Order_query$key>(
            fragment, fragmentRef
        );

    const effect = function () {
        if (params.referrer) {
            Console.log(data);
            if ((!data || !data.readReferrer)) {
                setReferral("");
                useStartLoading();
                navigate("/order", { state: { redirected: true } });
            }
        }
    };
    React.useEffect(effect, [location.pathname]);

    const submit = function () {
        if (!refetched)
            return;
        setRefetched(false);

        if (referral.length > 0) {
            Console.log(data);
            if (!data || !data.readReferrer) {
                setError(true);
                return;
            }
        }

        const referralText = referral === "" ?
            `No referral code` :
            `Referral code: ${referral}`;
        const referralHtml = referral === "" ?
            `<p><strong>No referral code</strong></p>` :
            `<p><strong>Referral code</strong></p><p>${referral}</p>`;
        const gwText = `Details: ${details} * ${referralText}`;
        const detailsSplit = details.split("\n");
        const detailsHtml = detailsSplit.map(function (value: string) {
            return `<p>${value}</p>`;
        });
        const detailsJoined = detailsHtml.reduce(
            function (prev: string, next: string) { return prev + next; }
        );
        const gwHtml =
            `<p><strong>Details</strong></p><p>${detailsJoined}</p>${referralHtml}`;

        const gwVariables =
        {
            "input":
            {
                "from": `noreply@ghostwritten.io`,
                "to": `support@ghostwritten.io`,
                "replyTo": email,
                "subject": `Request for ${serviceType} from <${email}>`,
                "text": gwText,
                "html": gwHtml,
            }
        };

        const clientText = `Hello, and thanks for choosing Ghostwritten! ` +
            `This is a confirmation email to let you know that we have ` +
            `received your request. You will be hearing from us shortly.`;
        const clientHtml = `<p>Hello,</p><p>Thanks for choosing Ghostwritten!` +
            ` This is a is a confirmation email to let you know that we have ` +
            `received your request. You will be hearing from us shortly.</p>`;

        const clientVariables =
        {
            "input":
            {
                "from": `noreply@ghostwritten.io`,
                "to": `${email}`,
                "subject": `We've received your request!`,
                "text": clientText,
                "html": clientHtml,
            }
        };

        props.onSubmit([gwVariables, clientVariables]);
    };
    React.useEffect(submit, [refetched]);

    const onSubmit = function (event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        if (referral.length > 0) {
            const refetchOptions: Relay.RefetchOptions =
            {
                onComplete: function () { setRefetched(true); }
            };
            refetch({ code: referral }, refetchOptions);
        }
        else
            setRefetched(true);
    };

    const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const emailValid = emailRegex.test(email);
    const lengthsValid = details.length > 0 && email.length > 0;
    const complete = serviceType !== "unknown" && lengthsValid && emailValid;

    const element =
        <div className="form-wrapper">
            <form className="order" onSubmit={onSubmit}>
                {
                    error &&
                    <>
                        <h1>
                            <span className="info required">
                                <strong>
                                    Invalid referral code "{referral}".
                                </strong>
                            </span>
                        </h1>
                        <br />
                    </>
                }
                <h1>
                    <strong>Service</strong>
                    <span className="info required">(required)</span>
                </h1>
                <div className="form-item-wrapper">
                    <input
                        type="radio" id="radio-tutoring"
                        name="essay-type" required
                        onChange={function () { setServiceType("tutoring"); }}
                    />
                    <label className="radio" htmlFor="radio-tutoring">
                        Tutoring
                    </label>
                    <input
                        type="radio" id="radio-essay" name="essay-type" required
                        onChange={function () { setServiceType("essay"); }}
                    />
                    <label className="radio" htmlFor="radio-essay">Essay</label>
                    <div className="radio-spacer"></div>
                    <input
                        type="radio" id="radio-college-application"
                        name="essay-type" required
                        onChange={function () { setServiceType("college application"); }}
                    />
                    <label
                        className="radio"
                        htmlFor="radio-college-application"
                    >
                        College App
                    </label>
                </div>
                <h1>
                    <strong>Details</strong>
                    <span className="info required">(required)</span>
                </h1>
                <div className="form-item-wrapper">
                    <textarea
                        wrap="soft" name="details" required
                        placeholder="Enter details here..."
                        value={details}
                        onChange={function (event) {
                            setDetails(
                                (event.target as (typeof event.target & Value))
                                    .value);
                        }}
                    />
                </div>
                <h1>
                    <strong>Email</strong>
                    <span className="info required">(required)</span>
                </h1>
                <div className="form-item-wrapper">
                    <input
                        type="text" id="email" name="email" required
                        placeholder="email@example.com"
                        onChange={function (event) {
                            setEmail(
                                (event.target as (typeof event.target & Value))
                                    .value.trim().toLowerCase()
                            );
                        }}
                        value={email}
                    />
                </div>
                {
                    email.length > 0 && !emailValid &&
                    <>
                        <h1>
                            <span className="info required">
                                <strong>Please enter a valid email.</strong>
                            </span>
                        </h1>
                        <br />
                    </>
                }
                <h1>
                    <strong>Referral code</strong>
                    <span className="info">(optional)</span>
                </h1>
                <div className="form-item-wrapper">
                    <input
                        type="text" id="referral" name="referral"
                        value={params.referrer ?? referral}
                        placeholder={"Enter a valid referral code for 5% off!"}
                        disabled={params.referrer ? true : undefined}
                        onChange={function (event) {
                            setReferral(
                                (event.target as (typeof event.target & Value))
                                    .value.trim().toLowerCase()
                            );
                            setError(false);
                        }}
                    />
                </div>
                <div className="form-item-wrapper">
                    <div className="terms-item-wrapper">
                        <span className="terms-text">
                            By confirming, you agree to the <ReactRouter.Link to="/terms">Terms of Service</ReactRouter.Link>
                        </span>
                    </div>
                </div>
                <div className="form-item-wrapper">
                    <input type="submit" value="Confirm"
                        className={"button" + (complete ? " shadow" : "")}
                    />
                </div>
            </form>
        </div>;
    return element;
}


function Success() {
    const element =
        <div className="main-text">
            <h1>We've received your order</h1>
            <p>
                You should receive a confirmation email from us very shortly.
                Make sure to check your junk and spam folders regularly so you
                don't miss it! In the meantime, sit back, relax, and let our
                writers do the rest.
            </p>
        </div>;
    return element;
}

function Failure() {
    const email =
        <a href="mailto:support@ghostwritten.io">support@ghostwritten.io</a>;
    const element =
        <div className="main-text">
            <h1>This shouldn't have happened</h1>
            <p>
                It seems like we've had trouble processing your request at our
                servers. Make sure you have entered a valid email address, or
                try refreshing the page and checking your internet connection.
            </p>
            <p>
                If the issue persists, send us an email at {email} and
                our support team will do our best to help you immediately.
            </p>
        </div>;
    return element;
}

export default function Order() {
    const [status, setStatus] = React.useState(Status.form);

    const [commit, isInFlight] = Relay.useMutation(mutation);

    function onSubmit(mutations: Relay.Variables[]) {
        switch (environment()) {
            case Environment.SERVER:
                return;
            case Environment.CLIENT:
                break;
        }

        setStatus(Status.loading);
        for (const mutation of mutations) {
            const onCompleted =
                function (response: unknown, errors: unknown | null) {
                    if (errors) {
                        Console.error(errors);
                        setStatus(Status.failure);
                    }
                    else {
                        Console.log(response);
                        if (!(response as OrderMutationResponse).sendEmail)
                            setStatus(Status.failure);
                    }
                };
            const onError = function (error: Error) {
                Console.error(error);
                setStatus(Status.failure);
            };
            commit({
                variables: mutation,
                onCompleted: onCompleted,
                onError: onError
            });
            switch (status) {
                case Status.failure:
                    return;
                default:
                    break;
            }
        }
        switch (status) {
            case Status.failure:
                return;
            default:
                setStatus(Status.success);
                break;
        }
    }

    switch (status) {
        case Status.loading:
            return <Spinner />;
        case Status.form:
            return <Form onSubmit={onSubmit} />;
        case Status.success:
            return <Success />;
        case Status.failure:
            return <Failure />;
    }
}
