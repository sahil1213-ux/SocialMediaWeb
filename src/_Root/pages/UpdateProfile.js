import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, useParams } from "react-router-dom";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, } from "@/components/ui/form";
import { useToast } from "@/components/ui/use-toast";
import { ProfileValidation } from "@/@/lib/validation";
import { useUserContext } from "@/context";
import { useGetUserById, useUpdateUser, } from "@/react-query/queriesAndMutations";
import ProfileUploader from "@/components/Shared/ProfileUploader";
import { Loader } from "@/components/Shared";
import { Textarea } from "@/components/ui/Textarea";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
const UpdateProfile = () => {
    const { toast } = useToast();
    const navigate = useNavigate();
    const { id } = useParams();
    const { user, setUser } = useUserContext();
    const form = useForm({
        resolver: zodResolver(ProfileValidation),
        defaultValues: {
            file: [],
            name: user.name,
            username: user.username,
            email: user.email,
            bio: user.bio || "",
        },
    });
    // Queries
    const { data: currentUser } = useGetUserById(id || "");
    const { mutateAsync: updateUser, isPending: isLoadingUpdate } = useUpdateUser();
    if (!currentUser)
        return (_jsx("div", { className: "flex-center w-full h-full", children: _jsx(Loader, {}) }));
    // Handler
    const handleUpdate = async (value) => {
        const updatedUser = await updateUser({
            userId: currentUser.$id,
            name: value.name,
            bio: value.bio,
            file: value.file,
            imageUrl: currentUser.imageUrl,
            imageId: currentUser.imageId,
        });
        if (!updatedUser) {
            toast({
                title: `Update user failed. Please try again.`,
            });
        }
        setUser({
            ...user,
            name: updatedUser?.name,
            bio: updatedUser?.bio,
            imageUrl: updatedUser?.imageUrl,
        });
        return navigate(`/profile/${id}`);
    };
    return (_jsx("div", { className: "flex flex-1", children: _jsxs("div", { className: "common-container", children: [_jsxs("div", { className: "flex-start gap-3 justify-start w-full max-w-5xl", children: [_jsx("img", { src: "/assets/icons/edit.svg", width: 36, height: 36, alt: "edit", className: "invert-white" }), _jsx("h2", { className: "h3-bold md:h2-bold text-left w-full", children: "Edit Profile" })] }), _jsx(Form, { ...form, children: _jsxs("form", { onSubmit: form.handleSubmit(handleUpdate), className: "flex flex-col gap-7 w-full mt-4 max-w-5xl", children: [_jsx(FormField, { control: form.control, name: "file", render: ({ field }) => (_jsxs(FormItem, { className: "flex", children: [_jsx(FormControl, { children: _jsx(ProfileUploader, { fieldChange: field.onChange, mediaUrl: currentUser.imageUrl }) }), _jsx(FormMessage, { className: "shad-form_message" })] })) }), _jsx(FormField, { control: form.control, name: "name", render: ({ field }) => (_jsxs(FormItem, { children: [_jsx(FormLabel, { className: "shad-form_label", children: "Name" }), _jsx(FormControl, { children: _jsx(Input, { type: "text", className: "shad-input", ...field }) }), _jsx(FormMessage, {})] })) }), _jsx(FormField, { control: form.control, name: "username", render: ({ field }) => (_jsxs(FormItem, { children: [_jsx(FormLabel, { className: "shad-form_label", children: "Username" }), _jsx(FormControl, { children: _jsx(Input, { type: "text", className: "shad-input", ...field, disabled: true }) }), _jsx(FormMessage, {})] })) }), _jsx(FormField, { control: form.control, name: "email", render: ({ field }) => (_jsxs(FormItem, { children: [_jsx(FormLabel, { className: "shad-form_label", children: "Email" }), _jsx(FormControl, { children: _jsx(Input, { type: "text", className: "shad-input", ...field, disabled: true }) }), _jsx(FormMessage, {})] })) }), _jsx(FormField, { control: form.control, name: "bio", render: ({ field }) => (_jsxs(FormItem, { children: [_jsx(FormLabel, { className: "shad-form_label", children: "Bio" }), _jsx(FormControl, { children: _jsx(Textarea, { className: "shad-textarea custom-scrollbar", ...field }) }), _jsx(FormMessage, { className: "shad-form_message" })] })) }), _jsxs("div", { className: "flex gap-4 items-center justify-end", children: [_jsx(Button, { type: "button", className: "shad-button_dark_4", onClick: () => navigate(-1), children: "Cancel" }), _jsxs(Button, { type: "submit", className: "shad-button_primary whitespace-nowrap", disabled: isLoadingUpdate, children: [isLoadingUpdate && _jsx(Loader, {}), "Update Profile"] })] })] }) })] }) }));
};
export default UpdateProfile;
