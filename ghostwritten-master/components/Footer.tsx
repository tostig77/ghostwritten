
import * as React from "react";
import * as ReactRouter from "react-router-dom";

export default function Footer() {
    const element =
        <div className="footer">
            <div className="links">
                <ReactRouter.Link to="/privacy">Privacy</ReactRouter.Link>
                <ReactRouter.Link to="/terms">Terms</ReactRouter.Link>
                <ReactRouter.Link to="/license">License</ReactRouter.Link>
                <ReactRouter.Link to="/support">Support</ReactRouter.Link>
                <ReactRouter.Link to="/careers">Careers</ReactRouter.Link>
            </div>
            <p className="copyinfo">© {
                new Date().getFullYear()
            } Ghostwritten</p>
        </div>;
    return element;
}
