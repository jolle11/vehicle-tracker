import { MantineProvider, createTheme } from "@mantine/core";
import "@mantine/core/styles.css";
import { Provider } from "jotai";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import "@mantine/notifications/styles.css";
import { Notifications } from "@mantine/notifications";

const theme = createTheme({
	fontFamily: "DM Sans, sans-serif",
	fontFamilyMonospace: "DM Sans, sans-serif",
	headings: { fontFamily: "DM Sans, sans-serif" },
	defaultRadius: "md",
	primaryColor: "indigo",
	primaryShade: 7,
});

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<Provider>
			<MantineProvider theme={theme}>
				<Notifications />
				<App />
			</MantineProvider>
		</Provider>
	</React.StrictMode>,
);
