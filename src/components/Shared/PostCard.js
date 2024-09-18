import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Link } from "react-router-dom";
import { useUserContext } from "@/context";
import { multiFormatDateString } from "@/utils/PostHelpingFunctions";
import PostStats from "./PostStats";
const PostCard = ({ post }) => {
    const { user } = useUserContext();
    if (!post.creator)
        return;
    return (_jsxs("div", { className: "post-card", children: [_jsxs("div", { className: "flex-between", children: [_jsxs("div", { className: "flex items-center gap-3", children: [_jsx(Link, { to: `/profile/${post.creator.$id}`, children: _jsx("img", { src: post.creator?.imageUrl ||
                                        "/assets/icons/profile-placeholder.svg", alt: "creator", className: "w-12 lg:h-12 rounded-full" }) }), _jsxs("div", { className: "flex flex-col", children: [_jsx("p", { className: "base-medium lg:body-bold text-light-1", children: post.creator.name }), _jsxs("div", { className: "flex-center gap-2 text-light-3", children: [_jsx("p", { className: "subtle-semibold lg:small-regular ", children: multiFormatDateString(post.$createdAt) }), "\u2022", _jsx("p", { className: "subtle-semibold lg:small-regular", children: post.location })] })] })] }), _jsx(Link, { to: `/update-post/${post.$id}`, className: `${user.id !== post.creator.$id && "hidden"}`, children: _jsx("img", { src: "/assets/icons/edit.svg", alt: "edit", width: 20, height: 20 }) })] }), _jsxs(Link, { to: `/posts/${post.$id}`, children: [_jsxs("div", { className: "small-medium lg:base-medium py-5", children: [_jsx("p", { children: post.caption }), _jsx("ul", { className: "flex gap-1 mt-2", children: post.tags.map((tag, index) => (_jsxs("li", { className: "text-light-3 small-regular", children: ["#", tag] }, `${tag}${index}`))) })] }), _jsx("img", { src: post.imageUrl || "/assets/icons/profile-placeholder.svg", alt: "post image", className: "post-card_img" })] }), _jsx(PostStats, { post: post, userId: user.id })] }));
};
export default PostCard;
