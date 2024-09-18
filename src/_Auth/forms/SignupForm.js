import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button } from "@/@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { SignupValidation } from "@/@/lib/validation";
import Loader from "@/components/Shared/Loader";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { useCreateUserAccountMutation, useSignInAccount, } from "@/react-query/queriesAndMutations";
import { useUserContext } from "@/context";
const SignupForm = () => {
    const { toast } = useToast(); // *2 Step 3
    const navigate = useNavigate(); // *4 Step 3 and Step 4 is to wrap our main.tsx with AuthProvider
    const { checkAuthUser, isLoading: isUserLoading } = useUserContext(); // *4 Step 2 to use context
    // 1. Define your form.
    const form = useForm({
        resolver: zodResolver(SignupValidation),
        defaultValues: {
            name: "",
            username: "",
            email: "",
            password: "",
        },
    });
    // Queries
    const { mutateAsync: createAccount, isPending: isCreatingAccount } = useCreateUserAccountMutation();
    const { mutateAsync: signInAccount, isPending: isSigningInUser } = useSignInAccount(); // *3 Step 2 to use mutation function
    // 2. Define a submit handler.
    // Handler *4 Step 7 is to create a function to handle signup final step is to use it.
    const handleSignup = async (user) => {
        try {
            const newUser = await createAccount(user);
            if (!newUser) {
                toast({ title: "Sign up failed. Please try again." });
                return;
            }
            const session = await signInAccount({
                email: user.email,
                password: user.password,
            });
            console.log("Session:", session); // Log the session
            if (!session) {
                toast({ title: "Something went wrong. Please login your new account" });
                navigate("/sign-in");
                return;
            }
            const isLoggedIn = await checkAuthUser();
            console.log("Is Logged In:", isLoggedIn); // Log the authentication check
            if (isLoggedIn) {
                form.reset();
                navigate("/");
            }
            else {
                // toast({ title: "Login failed. Please try again." });
                return;
            }
        }
        catch (error) {
            console.log({ error });
        }
    };
    return (_jsx(Form, { ...form, children: _jsxs("div", { className: " sm:w-[420px] flex-center flex-col", children: [_jsx("img", { src: "/assets/images/logo.svg", alt: "logo" }), _jsx("h2", { className: " h3-bold md:h2-bold pt-5 sm:pt-10", children: "Create a new Account." }), _jsx("p", { className: " text-light-3 small-medium md:base-regular my-2", children: "To use SnapGram, Please enter your details." }), _jsxs("form", { onSubmit: form.handleSubmit(handleSignup), className: "space-y-6", children: [_jsx(FormField, { control: form.control, name: "name", render: ({ field }) => (_jsxs(FormItem, { children: [_jsx(FormLabel, { children: "Name" }), _jsx(FormControl, { children: _jsx(Input, { type: "text", className: " shad-input tracking-wider", placeholder: "Sahil Anand", ...field }) }), _jsx(FormMessage, {})] })) }), _jsx(FormField, { control: form.control, name: "username", render: ({ field }) => (_jsxs(FormItem, { children: [_jsx(FormLabel, { children: "Username" }), _jsx(FormControl, { children: _jsx(Input, { type: "text", className: "shad-input tracking-wider", placeholder: "sahil1213-ux", ...field }) }), _jsx(FormMessage, {})] })) }), _jsx(FormField, { control: form.control, name: "email", render: ({ field }) => (_jsxs(FormItem, { children: [_jsx(FormLabel, { children: "Email" }), _jsx(FormControl, { children: _jsx(Input, { type: "text", className: "shad-input tracking-wider", placeholder: "sahil@gmail.com", ...field }) }), _jsx(FormMessage, {})] })) }), _jsx(FormField, { control: form.control, name: "password", render: ({ field }) => (_jsxs(FormItem, { children: [_jsx(FormLabel, { children: "Password" }), _jsx(FormControl, { children: _jsx(Input, { type: "password", className: "shad-input tracking-wider", ...field }) }), _jsx(FormMessage, {})] })) }), _jsx(Button, { type: "submit", className: " shad-button_primary w-full", children: isCreatingAccount || isSigningInUser || isUserLoading ? (_jsxs("div", { className: " flex-center gap-3", children: [_jsx(Loader, {}), " Loading..."] })) : ("Sign up") }), _jsxs("p", { className: " text-small-regular text-light-2 text-center mt-2", children: ["Already have an account?", " ", _jsx(Link, { to: "/sign-in", className: " text-blue-500", children: "Sign in" })] })] })] }) }));
};
export default SignupForm;
