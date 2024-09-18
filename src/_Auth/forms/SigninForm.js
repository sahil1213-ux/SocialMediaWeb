import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import Loader from "@/components/Shared/Loader";
import { SigninValidation } from "@/@/lib/validation";
import { useUserContext } from "@/context";
import { useSignInAccount } from "@/react-query/queriesAndMutations";
const SigninForm = () => {
    const { toast } = useToast();
    const navigate = useNavigate();
    const { checkAuthUser, isLoading: isUserLoading } = useUserContext();
    // Query
    const { mutateAsync: signInAccount, status } = useSignInAccount();
    const isLoading = status === "pending";
    const form = useForm({
        resolver: zodResolver(SigninValidation),
        defaultValues: {
            email: "",
            password: "",
        },
    });
    const handleSignin = async (user) => {
        const session = await signInAccount(user);
        if (!session) {
            toast({ title: "Login failed. Please try again." });
            return;
        }
        const isLoggedIn = await checkAuthUser();
        if (isLoggedIn) {
            form.reset();
            navigate("/");
        }
        else {
            toast({ title: "Login failed. Please try again." });
            return;
        }
    };
    return (_jsx(Form, { ...form, children: _jsxs("div", { className: "sm:w-420 flex-center flex-col", children: [_jsx("img", { src: "/assets/images/logo.svg", alt: "logo" }), _jsx("h2", { className: "h3-bold md:h2-bold pt-5 sm:pt-12", children: "Log in to your account" }), _jsx("p", { className: "text-light-3 small-medium md:base-regular mt-2", children: "Welcome back! Please enter your details." }), _jsxs("form", { onSubmit: form.handleSubmit(handleSignin), className: "flex flex-col gap-5 w-full mt-4", children: [_jsx(FormField, { control: form.control, name: "email", render: ({ field }) => (_jsxs(FormItem, { children: [_jsx(FormLabel, { className: "shad-form_label", children: "Email" }), _jsx(FormControl, { children: _jsx(Input, { type: "text", className: "shad-input", ...field }) }), _jsx(FormMessage, {})] })) }), _jsx(FormField, { control: form.control, name: "password", render: ({ field }) => (_jsxs(FormItem, { children: [_jsx(FormLabel, { className: "shad-form_label", children: "Password" }), _jsx(FormControl, { children: _jsx(Input, { type: "password", className: "shad-input", ...field }) }), _jsx(FormMessage, {})] })) }), _jsx(Button, { type: "submit", className: "shad-button_primary", children: isLoading || isUserLoading ? (_jsxs("div", { className: "flex-center gap-2", children: [_jsx(Loader, {}), " Loading..."] })) : ("Log in") }), _jsxs("p", { className: "text-small-regular text-light-2 text-center mt-2", children: ["Don't have an account?", _jsx(Link, { to: "/sign-up", className: "text-primary-500 text-small-semibold ml-1", children: "Sign up" })] })] })] }) }));
};
export default SigninForm;
