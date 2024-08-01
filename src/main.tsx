import ReactDOM from "react-dom/client";
import App from "./App"; // Ensure you have this import if not already
import { BrowserRouter as Router } from "react-router-dom";
import { QueryProvider } from "./react-query/QueryProvider";
import { AuthProvider } from "./context/Authcontext";
ReactDOM.createRoot(document.getElementById("root")!).render(
  // *1=> Steps for routing , Step 1
  <Router>
    {/* *4 Step 5 is to make QueryProvider.tsx in react-query folder */}
    <QueryProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
    </QueryProvider>
  </Router>
);

// for step 7 go to src/_Auth/forms/SignupForm.tsx
