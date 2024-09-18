import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Link, useLocation } from "react-router-dom";
import { bottombarLinks } from "@/constants";
const Bottombar = () => {
    const { pathname } = useLocation();
    return (_jsx("section", { className: "bottom-bar", children: bottombarLinks.map((link) => {
            const isActive = pathname === link.route;
            return (_jsxs(Link, { to: link.route, className: `${isActive && "rounded-[10px] bg-primary-500 "} flex-center flex-col gap-1 p-2 transition`, children: [_jsx("img", { src: link.imgURL, alt: link.label, width: 16, height: 16, className: `${isActive && "invert-white"}` }), _jsx("p", { className: "tiny-medium text-light-2", children: link.label })] }, `bottombar-${link.label}`));
        }) }));
};
export default Bottombar;
