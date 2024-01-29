import { MantineProvider, createTheme } from "@mantine/core";
import "@mantine/core/styles.css";
import { Provider } from "jotai";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

const theme = createTheme({
	fontFamily: "DM Sans, sans-serif",
	fontFamilyMonospace: "DM Sans, sans-serif",
	headings: { fontFamily: "DM Sans, sans-serif" },
	defaultRadius: "md",
});

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<Provider>
			<MantineProvider theme={theme}>
				<App />
			</MantineProvider>
		</Provider>
	</React.StrictMode>,
);
