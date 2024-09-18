import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button } from "@/@/components/ui/button";
import { useUserContext } from "@/context";
import { useSignOutAccount } from "@/react-query/queriesAndMutations";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
const Topbar = () => {
    const { mutateAsync: signOut, isSuccess } = useSignOutAccount();
    const navigate = useNavigate();
    const { user } = useUserContext();
    useEffect(() => {
        if (isSuccess) {
            navigate(0);
        }
    }, [isSuccess]);
    return (_jsx("section", { className: " topbar", children: _jsxs("div", { className: " flex-between py-4 px-5", children: [_jsx(Link, { to: "/", className: " flex gap-3 items-center", children: _jsx("img", { src: "/assets/images/logo.svg", alt: "logo", width: 130, height: 325 }) }), _jsxs("div", { className: " flex gap-4", children: [_jsx(Button, { variant: "ghost", className: " shad-button_ghost", onClick: () => signOut(), children: _jsx("img", { src: "/assets/icons/logout.svg", alt: "logout" }) }), _jsx(Link, { to: `/profile/${user.id}`, className: " flex-center gap-3", children: _jsx("img", { src: user.imageUrl || "/assets/images/profile.png", alt: "profile", className: " rounded-full h-8 w-8" }) })] })] }) }));
};
export default Topbar;
