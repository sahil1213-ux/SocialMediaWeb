import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { GridPostList, Loader } from "@/components/Shared";
import { useGetCurrentUser } from "@/react-query/queriesAndMutations";
const LikedPosts = () => {
    const { data: currentUser } = useGetCurrentUser();
    console.log("currentUser", currentUser);
    if (!currentUser)
        return (_jsx("div", { className: "flex-center w-full h-full", children: _jsx(Loader, {}) }));
    return (_jsxs(_Fragment, { children: [currentUser.liked.length === 0 && (_jsx("p", { className: "text-light-4", children: "No liked posts" })), _jsx(GridPostList, { posts: currentUser.liked, showStats: false })] }));
};
export default LikedPosts;
