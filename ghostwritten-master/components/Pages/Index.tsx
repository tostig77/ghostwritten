
import * as React from "react";
import * as ReactRouter from "react-router-dom";
import MediaQuery from "react-responsive";
import * as ReactHelmet from "react-helmet";

export function Helmet() {
    const element: React.ReactElement =
        <ReactHelmet.Helmet>
            <title>Ghostwritten</title>
        </ReactHelmet.Helmet>;
    return element;
}

export function Button() {
    const element =
        <div className="button-wrapper">
            <ReactRouter.Link className="button shadow" to="/order">
                Get Started
            </ReactRouter.Link>
        </div>;
    return element;
}

export function Headline() {
    const element: React.ReactElement =
        <>
            <span className="ghost-gray">Our expertise.</span>
            <MediaQuery maxWidth={399}><br /></MediaQuery>
            <MediaQuery minWidth={400}><>&nbsp;</></MediaQuery>
            <strong>Your</strong> success.
        </>;
    return element;
}

export function Page() {
    const element: React.ReactElement =
        <div className="main-text">
            <p>
                Looking for a high school or college-level essay?
                No problem. Need tutoring on a tough subject? Done.
                Confused on how to write your college application? Tell us
                what you need and when, then leave the rest to our team
                of skilled writers and tutors.
            </p>
            <p>
                We guarantee on-time,
                A-grade service no matter what you need.
            </p>
            <h1>About us</h1>
            <p>
                We are a team of dedicated writers and tutors who have
                consistently achieved exceptional results through high
                school and college, in subjects such as high level
                mathematics, physics, literature, and biology.
            </p>
            <p>
                We know exactly how hard it is to write a good essay,
                or get ready for that big final exam, because we’ve been
                through it before. We are committed to using our academic
                expertise to help you become a top-scoring student.
            </p>
            <h1>Why Ghostwritten?</h1>
            <p>
                Many academic services are staffed by people
                who have not touched a college or high school textbook
                in years, and are out of touch with modern
                curriculums.
            </p>
            <p>
                Others employ unreliable freelancers who face no
                reprecussions for conducting fraud, scams, or rating
                manipulation.
            </p>
            <p>
                When you choose Ghostwritten, you are guaranteed
                dedicated, reliable writers and tutors who have
                experience with your requirements and curriculum,
                including IB, AP, various college programs, and many
                more.
            </p>
        </div>;
    return element;
}