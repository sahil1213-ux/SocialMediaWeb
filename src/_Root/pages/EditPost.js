import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useParams } from "react-router-dom";
import PostForm from "@/components/forms/PostForm";
import { useGetPostById } from "@/react-query/queriesAndMutations";
import { Loader } from "@/components/Shared";
const EditPost = () => {
    const { id } = useParams();
    const { data: post, isLoading } = useGetPostById(id);
    if (isLoading)
        return (_jsx("div", { className: "flex-center w-full h-full", children: _jsx(Loader, {}) }));
    return (_jsx("div", { className: "flex flex-1", children: _jsxs("div", { className: "common-container", children: [_jsxs("div", { className: "flex-start gap-3 justify-start w-full max-w-5xl", children: [_jsx("img", { src: "/assets/icons/edit.svg", width: 36, height: 36, alt: "edit", className: "invert-white" }), _jsx("h2", { className: "h3-bold md:h2-bold text-left w-full", children: "Edit Post" })] }), isLoading ? _jsx(Loader, {}) : _jsx(PostForm, { action: "Update", post: post })] }) }));
};
export default EditPost;
