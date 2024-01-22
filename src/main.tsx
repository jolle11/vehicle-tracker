import "@fontsource-variable/dm-sans";
import { MantineProvider, createTheme } from "@mantine/core";
import "@mantine/core/styles.css";
import { Provider } from "jotai";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

const theme = createTheme({
    fontFamily: "DM Sans Variable, sans-serif",
    defaultRadius: "lg",
});

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <Provider>
            <MantineProvider theme={theme}>
                <App />
            </MantineProvider>
        </Provider>
    </React.StrictMode>
);
