import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { GridPostList, Loader } from "@/components/Shared";
import { useGetCurrentUser } from "@/react-query/queriesAndMutations";
const Saved = () => {
    const { data: currentUser } = useGetCurrentUser();
    const savePosts = currentUser?.save
        .map((savePost) => ({
        ...savePost.post,
        creator: {
            imageUrl: currentUser.imageUrl,
        },
    }))
        .reverse();
    return (_jsxs("div", { className: "saved-container", children: [_jsxs("div", { className: "flex gap-2 w-full max-w-5xl", children: [_jsx("img", { src: "/assets/icons/save.svg", width: 36, height: 36, alt: "edit", className: "invert-white" }), _jsx("h2", { className: "h3-bold md:h2-bold text-left w-full", children: "Saved Posts" })] }), !currentUser ? (_jsx(Loader, {})) : (_jsx("ul", { className: "w-full flex justify-center max-w-5xl gap-9", children: savePosts.length === 0 ? (_jsx("p", { className: "text-light-4", children: "No available posts" })) : (_jsx(GridPostList, { posts: savePosts, showStats: false })) }))] }));
};
export default Saved;
