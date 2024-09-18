import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
const AuthLayout = () => {
    const [isAuth] = useState(false);
    return (_jsx(_Fragment, { children: isAuth ? (_jsx(Navigate, { to: "/" })) : (_jsxs(_Fragment, { children: [_jsx("section", { className: " flex flex-col justify-center items-center flex-1 py-10", children: _jsx(Outlet, {}) }), _jsx("img", { src: "/public/assets/images/side-img.svg", alt: "side-img", className: " hidden xl:block w-1/2 h-screen bg-no-repeat object-cover" })] })) }));
};
export default AuthLayout;
