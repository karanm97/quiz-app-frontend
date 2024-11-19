import React from "react";
import ReactDOM from "react-dom/client";

const App = () => {
  return (
    <>
      <h1 className="text-lg p-4 m-4 text-red-600">Hello World</h1>
    </>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
