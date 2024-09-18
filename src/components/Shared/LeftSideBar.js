import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button } from "@/@/components/ui/button";
import { sidebarLinks } from "@/constants";
import { useUserContext } from "@/context";
import { Link, NavLink, useLocation } from "react-router-dom";
const LeftSideBar = () => {
    const { user } = useUserContext();
    const { pathname } = useLocation();
    return (_jsxs("nav", { className: " leftsidebar", children: [_jsxs("div", { className: " flex flex-col gap-11", children: [_jsx(Link, { to: "/", className: " flex gap-3 items-center", children: _jsx("img", { src: "/assets/images/logo.svg", alt: "logo", width: 170, height: 36 }) }), _jsxs(Link, { to: `/profile/${user.id}`, className: " flex-center gap-3", children: [_jsx("img", { src: user.imageUrl || "/assets/images/profile.png", alt: "profile", className: " rounded-full h-14 w-14" }), _jsxs("div", { className: " flex flex-col", children: [_jsx("p", { className: " body-bold", children: user.name }), _jsx("p", { className: " body-light", children: user.email })] })] }), _jsx("ul", { className: " flex flex-col gap-6 group", children: sidebarLinks.map((link) => {
                            const isActive = pathname === link.route;
                            return (_jsx("li", { className: `leftsidebar-link ${isActive && "bg-primary-500"}`, children: _jsxs(NavLink, { to: link.route, className: "flex gap-4 items-center p-4", children: [_jsx("img", { src: link.imgURL, alt: link.label, className: `group-hover:invert-white ${isActive && "invert-white"}` }), link.label] }) }, link.label));
                        }) })] }), _jsxs(Button, { variant: "ghost", className: " shad-button_ghost", onClick: () => console.log("logout"), children: [_jsx("img", { src: "/assets/icons/logout.svg", alt: "logout" }), "", "logout"] })] }));
};
export default LeftSideBar;
