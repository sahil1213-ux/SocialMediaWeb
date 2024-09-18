import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
const UserCard = ({ user }) => {
    return (_jsxs(Link, { to: `/profile/${user.$id}`, className: "user-card", children: [_jsx("img", { src: user.imageUrl || "/assets/icons/profile-placeholder.svg", alt: "creator", className: "rounded-full w-14 h-14" }), _jsxs("div", { className: "flex-center flex-col gap-1", children: [_jsx("p", { className: "base-medium text-light-1 text-center line-clamp-1", children: user.name }), _jsxs("p", { className: "small-regular text-light-3 text-center line-clamp-1", children: ["@", user.username] })] }), _jsx(Button, { type: "button", size: "sm", className: "shad-button_primary px-5", children: "Follow" })] }));
};
export default UserCard;
