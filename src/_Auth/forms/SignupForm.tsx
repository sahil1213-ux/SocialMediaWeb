import { Button } from "@/@/components/ui/button";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { SignupValidation } from "@/@/lib/validation";
import Loader from "@/components/Shared/Loader";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import {
  useCreateUserAccountMutation,
  useSignInAccount,
} from "@/react-query/queriesAndMutations";
import { useUserContext } from "@/context";

const SignupForm = () => {
  const { toast } = useToast(); // *2 Step 3
  const navigate = useNavigate(); // *4 Step 3 and Step 4 is to wrap our main.tsx with AuthProvider
  const { checkAuthUser, isLoading: isUserLoading } = useUserContext(); // *4 Step 2 to use context

  // 1. Define your form.
  const form = useForm<z.infer<typeof SignupValidation>>({
    resolver: zodResolver(SignupValidation),
    defaultValues: {
      name: "",
      username: "",
      email: "",
      password: "",
    },
  });

  // Queries
  const { mutateAsync: createAccount, isPending: isCreatingAccount } =
    useCreateUserAccountMutation();
  const { mutateAsync: signInAccount, isPending: isSigningInUser } =
    useSignInAccount(); // *3 Step 2 to use mutation function

  // 2. Define a submit handler.
  // Handler *4 Step 7 is to create a function to handle signup final step is to use it.
  const handleSignup = async (user: z.infer<typeof SignupValidation>) => {
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
      } else {
        // toast({ title: "Login failed. Please try again." });
        return;
      }
    } catch (error) {
      console.log({ error });
    }
  };

  return (
    <Form {...form}>
      <div className=" sm:w-[420px] flex-center flex-col">
        <img src="/assets/images/logo.svg" alt="logo" />

        <h2 className=" h3-bold md:h2-bold pt-5 sm:pt-10">
          Create a new Account.
        </h2>
        <p className=" text-light-3 small-medium md:base-regular my-2">
          To use SnapGram, Please enter your details.
        </p>
        <form onSubmit={form.handleSubmit(handleSignup)} className="space-y-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    className=" shad-input tracking-wider"
                    placeholder="Sahil Anand"
                    {...field}
                  />
                </FormControl>
                {/* <FormDescription>
                  This is your public display name.
                </FormDescription> */}
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    className="shad-input tracking-wider"
                    placeholder="sahil1213-ux"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    className="shad-input tracking-wider"
                    placeholder="sahil@gmail.com"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    className="shad-input tracking-wider"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className=" shad-button_primary w-full">
            {isCreatingAccount || isSigningInUser || isUserLoading ? (
              <div className=" flex-center gap-3">
                <Loader /> Loading...
              </div>
            ) : (
              "Sign up"
            )}
          </Button>

          <p className=" text-small-regular text-light-2 text-center mt-2">
            Already have an account?{" "}
            <Link to="/sign-in" className=" text-blue-500">
              Sign in
            </Link>
          </p>
        </form>
      </div>
    </Form>
  );
};

export default SignupForm;

// 12345678
