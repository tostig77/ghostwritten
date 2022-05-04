
import * as React from "react";
import * as ReactRouter from "react-router-dom";
import Relay from "react-relay/hooks";

import { Client, Console } from "./client.ts";

import App from "../components/App.tsx";

try 
{
    const httpclient = Client.create();

    switch (Client.env.MODE)
    {
        case "development":
            {
                const element: React.ReactElement =
                    <Relay.RelayEnvironmentProvider environment={Client.relayEnvironment}>
                        <ReactRouter.BrowserRouter>
                            <App />
                        </ReactRouter.BrowserRouter>
                    </Relay.RelayEnvironmentProvider>;
                httpclient.render(element);
                if (Client.hot)
                    Client.hot.accept();
                break;
            }
        case "production":
            {
                const element: React.ReactElement =
                    <React.StrictMode>
                        <Relay.RelayEnvironmentProvider environment={Client.relayEnvironment}>
                            <ReactRouter.BrowserRouter>
                                <App />
                            </ReactRouter.BrowserRouter>
                        </Relay.RelayEnvironmentProvider>
                    </React.StrictMode>;
                httpclient.render(element);
                break;
            }
        default:
            throw new Error("Unknown Snowpack mode");
    }
}
catch (error) { Console.error(error); }
