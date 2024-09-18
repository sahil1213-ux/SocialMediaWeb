import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/** to add anything use npx shadcn-ui@latest add [name]
 * imports
 * // tailwindcss-animate
 * npm install -D tailwindcss-animate
 * // routing
 * npm install react-router-dom
 * // shadcn/ui is a library for custom beautiful components that we can use with tailwindcss
 * npm i -D @types/node
 * // for sign and sign in
 * npx shadcn-ui@latest add form
 * npm i react-hook-form
 * // toast
 * npx shadcn-ui@latest add toast
 * // to use infinite scroll and auto caching
 * npm i @tanstack/react-query
 * // Simple React hook to create a HTML5-compliant drag'n'drop zone for files.
 * npm install --save react-dropzone
 * // progress bar
 * npx create-react-app my-progress-bar
 * // to keep the track of the elements enters or leaves the viewport used in explore.tsx
 * npm install react-intersection-observer --save
 * @returns
 */
import { Routes, Route } from "react-router-dom";
import "./global.css"; // this import is very important
import SigninForm from "./_Auth/forms/SigninForm";
import SignupForm from "./_Auth/forms/SignupForm";
import AuthLayout from "./_Auth/AuthLayout";
import RootLayout from "./_Root/RootLayout";
import { Toaster } from "./components/ui/toaster";
import { Home, Explore, Saved, AllUsers, CreatePost, EditPost, PostDetails, Profile, UpdateProfile, } from "./_Root/pages";
// *2 toast Step 1 import Toaster in starting Component
const App = () => {
    return (_jsxs("main", { className: " flex h-screen", children: [_jsxs(Routes, { children: [_jsxs(Route, { element: _jsx(AuthLayout, {}), children: [_jsx(Route, { path: "/sign-in", element: _jsx(SigninForm, {}) }), _jsx(Route, { path: "/sign-up", element: _jsx(SignupForm, {}) })] }), _jsxs(Route, { element: _jsx(RootLayout, {}), children: [_jsx(Route, { index: true, element: _jsx(Home, {}) }), _jsx(Route, { path: "/explore", element: _jsx(Explore, {}) }), _jsx(Route, { path: "/saved", element: _jsx(Saved, {}) }), _jsx(Route, { path: "/all-users", element: _jsx(AllUsers, {}) }), _jsx(Route, { path: "/create-post", element: _jsx(CreatePost, {}) }), _jsx(Route, { path: "/update-post/:id", element: _jsx(EditPost, {}) }), _jsx(Route, { path: "/posts/:id", element: _jsx(PostDetails, {}) }), _jsx(Route, { path: "/profile/:id/*", element: _jsx(Profile, {}) }), _jsx(Route, { path: "/update-profile/:id", element: _jsx(UpdateProfile, {}) })] })] }), _jsx(Toaster, {})] }));
};
export default App;
