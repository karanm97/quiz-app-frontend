import React from "react";
import ReactDOM from "react-dom/client";
import Login from "./Login";
import Header from "./components/Header";
import { Provider } from "react-redux";
import { store } from "./utils/store";

const App = () => {
	return (
		<>
			<Provider store={store}>
				<Header />
				{/* <Login /> */}
			</Provider>
		</>
	);
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
