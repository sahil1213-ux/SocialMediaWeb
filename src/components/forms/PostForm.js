import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
//   Button,
//   Input,
//   Textarea,
// } from "@/components/ui";
FormControl;
import { useToast } from "@/components/ui/use-toast";
// import { FileUploader, Loader } from "@/components/shared";
// import { useCreatePost, useUpdatePost } from "@/lib/react-query/queries";\
import { PostValidation } from "@/@/lib/validation";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage,
// Button,
// Input,
// Textarea,
 } from "../ui/form";
import { Button } from "@/@/components/ui/button";
import { Input } from "../ui/input";
import { useUserContext } from "@/context";
import FileUploader from "../Shared/FileUploader";
import { useCreatePost, useUpdatePost, } from "@/react-query/queriesAndMutations";
import Loader from "../Shared/Loader";
import { Textarea } from "../ui/Textarea";
const PostForm = ({ post, action }) => {
    const navigate = useNavigate();
    const { toast } = useToast();
    const { user } = useUserContext();
    const form = useForm({
        resolver: zodResolver(PostValidation),
        defaultValues: {
            caption: post ? post?.caption : "",
            file: [],
            location: post ? post.location : "",
            tags: post ? post.tags.join(",") : "",
        },
    });
    // Query
    const { mutateAsync: createPost, isPending: isLoadingCreate } = useCreatePost();
    const { mutateAsync: updatePost, isPending: isLoadingUpdate } = useUpdatePost();
    // Handler
    const handleSubmit = async (value) => {
        // ACTION = UPDATE
        if (post && action === "Update") {
            const updatedPost = await updatePost({
                ...value,
                postId: post.$id,
                imageId: post.imageId,
                imageUrl: post.imageUrl,
            });
            if (!updatedPost) {
                toast({
                    title: `${action} post failed. Please try again.`,
                });
            }
            return navigate(`/posts/${post.$id}`);
        }
        // ACTION = CREATE
        const newPost = await createPost({
            ...value,
            userId: user.id,
        });
        if (!newPost) {
            toast({
                title: `${action} post failed. Please try again.`,
            });
        }
        navigate("/");
    };
    return (_jsx(Form, { ...form, children: _jsxs("form", { onSubmit: form.handleSubmit(handleSubmit), className: "flex flex-col gap-9 w-full  max-w-5xl", children: [_jsx(FormField, { control: form.control, name: "caption", render: ({ field }) => (_jsxs(FormItem, { children: [_jsx(FormLabel, { className: "shad-form_label", children: "Caption" }), _jsx(FormControl, { children: _jsx(Textarea, { className: "shad-textarea custom-scrollbar", ...field }) }), _jsx(FormMessage, { className: "shad-form_message" })] })) }), _jsx(FormField, { control: form.control, name: "file", render: ({ field }) => (_jsxs(FormItem, { children: [_jsx(FormLabel, { className: "shad-form_label", children: "Add Photos" }), _jsx(FormControl, { children: _jsx(FileUploader, { fieldChange: field.onChange, mediaUrl: post?.imageUrl }) }), _jsx(FormMessage, { className: "shad-form_message" })] })) }), _jsx(FormField, { control: form.control, name: "location", render: ({ field }) => (_jsxs(FormItem, { children: [_jsx(FormLabel, { className: "shad-form_label", children: "Add Location" }), _jsx(FormControl, { children: _jsx(Input, { type: "text", className: "shad-input", ...field }) }), _jsx(FormMessage, { className: "shad-form_message" })] })) }), _jsx(FormField, { control: form.control, name: "tags", render: ({ field }) => (_jsxs(FormItem, { children: [_jsx(FormLabel, { className: "shad-form_label", children: "Add Tags (separated by comma \" , \")" }), _jsx(FormControl, { children: _jsx(Input, { placeholder: "Art, Expression, Learn", type: "text", className: "shad-input", ...field }) }), _jsx(FormMessage, { className: "shad-form_message" })] })) }), _jsxs("div", { className: "flex gap-4 items-center justify-end", children: [_jsx(Button, { type: "button", className: "shad-button_dark_4", onClick: () => navigate(-1), children: "Cancel" }), _jsxs(Button, { type: "submit", className: "shad-button_primary whitespace-nowrap", disabled: isLoadingCreate || isLoadingUpdate, children: [(isLoadingCreate || isLoadingUpdate) && _jsx(Loader, {}), action, " Post"] })] })] }) }));
};
export default PostForm;
