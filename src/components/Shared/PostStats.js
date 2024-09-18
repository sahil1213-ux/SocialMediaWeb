import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { checkIsLiked } from "@/utils/PostHelpingFunctions";
import { useLikePost, useSavePost, useDeleteSavedPost, useGetCurrentUser, } from "@/react-query/queriesAndMutations";
const PostStats = ({ post, userId }) => {
    const location = useLocation();
    const likesList = post.likes.map((user) => user.$id);
    const [likes, setLikes] = useState(likesList);
    const [isSaved, setIsSaved] = useState(false);
    const { mutate: likePost } = useLikePost();
    const { mutate: savePost } = useSavePost();
    const { mutate: deleteSavePost } = useDeleteSavedPost();
    const { data: currentUser } = useGetCurrentUser();
    const savedPostRecord = currentUser?.save.find((record) => record.post.$id === post.$id);
    useEffect(() => {
        setIsSaved(!!savedPostRecord);
    }, [savedPostRecord]);
    const handleLikePost = (e) => {
        e.stopPropagation();
        let likesArray = [...likes];
        if (likesArray.includes(userId)) {
            likesArray = likesArray.filter((Id) => Id !== userId);
        }
        else {
            likesArray.push(userId);
        }
        setLikes(likesArray);
        likePost({ postId: post.$id, likesArray });
    };
    const handleSavePost = (e) => {
        e.stopPropagation();
        if (savedPostRecord) {
            setIsSaved(false);
            return deleteSavePost(savedPostRecord.$id);
        }
        savePost({ userId: userId, postId: post.$id });
        setIsSaved(true);
    };
    const containerStyles = location.pathname.startsWith("/profile")
        ? "w-full"
        : "";
    return (_jsxs("div", { className: `flex justify-between items-center z-20 ${containerStyles}`, children: [_jsxs("div", { className: "flex gap-2 mr-5", children: [_jsx("img", { src: `${checkIsLiked(likes, userId)
                            ? "/assets/icons/liked.svg"
                            : "/assets/icons/like.svg"}`, alt: "like", width: 20, height: 20, onClick: (e) => handleLikePost(e), className: "cursor-pointer" }), _jsx("p", { className: "small-medium lg:base-medium", children: likes.length })] }), _jsx("div", { className: "flex gap-2", children: _jsx("img", { src: isSaved ? "/assets/icons/saved.svg" : "/assets/icons/save.svg", alt: "share", width: 20, height: 20, className: "cursor-pointer", onClick: (e) => handleSavePost(e) }) })] }));
};
export default PostStats;
