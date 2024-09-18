import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Bottombar from "@/components/Shared/Bottombar";
import LeftSideBar from "@/components/Shared/LeftSideBar";
import Topbar from "@/components/Shared/Topbar";
import { Outlet } from "react-router-dom";
const RootLayout = () => {
    return (_jsxs("div", { className: " w-full md:flex", children: [_jsx(Topbar, {}), _jsx(LeftSideBar, {}), _jsx("section", { className: " flex flex-1 h-full", children: _jsx(Outlet, {}) }), _jsx(Bottombar, {})] }));
};
export default RootLayout;
