import { jsx as _jsx } from "react/jsx-runtime";
import ReactDOM from "react-dom/client";
import App from "./App"; // Ensure you have this import if not already
import { BrowserRouter as Router } from "react-router-dom";
import { QueryProvider } from "./react-query/QueryProvider";
import { AuthProvider } from "./context/Authcontext";
ReactDOM.createRoot(document.getElementById("root")).render(
// *1=> Steps for routing , Step 1
_jsx(Router, { children: _jsx(QueryProvider, { children: _jsx(AuthProvider, { children: _jsx(App, {}) }) }) }));
