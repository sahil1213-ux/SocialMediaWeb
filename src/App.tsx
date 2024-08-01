/** to add anything use npx shadcn-ui@latest add [name]
 * imports
 * // tailwindcss-animate
 * npm install -D tailwindcss-animate
 * // routing
 * npm install react-router-dom
 * // shadcn/ui is a library for custom beautiful components that we can use with tailwindcss
 * npm i -D @types/node
 * // for sign and sign in
 * npx shadcn-ui@latest add form
 * npm i react-hook-form
 * // toast
 * npx shadcn-ui@latest add toast
 * // to use infinite scroll and auto caching
 * npm i @tanstack/react-query
 * // Simple React hook to create a HTML5-compliant drag'n'drop zone for files.
 * npm install --save react-dropzone
 * // progress bar
 * npx create-react-app my-progress-bar
 * // to keep the track of the elements enters or leaves the viewport used in explore.tsx
 * npm install react-intersection-observer --save
 * @returns
 */
import { Routes, Route } from "react-router-dom";
import "./global.css"; // this import is very important
import SigninForm from "./_Auth/forms/SigninForm";
import SignupForm from "./_Auth/forms/SignupForm";
import AuthLayout from "./_Auth/AuthLayout";
import RootLayout from "./_Root/RootLayout";
import { Toaster } from "./components/ui/toaster";
import {
  Home,
  Explore,
  Saved,
  AllUsers,
  CreatePost,
  EditPost,
  PostDetails,
  Profile,
  UpdateProfile,
} from "./_Root/pages";

// *2 toast Step 1 import Toaster in starting Component

const App = () => {
  return (
    <main className=" flex h-screen">
      {/* *1 Step 2 final and / means initial */}
      <Routes>
        {/* public routes */}
        <Route element={<AuthLayout />}>
          <Route path="/sign-in" element={<SigninForm />} />
          <Route path="/sign-up" element={<SignupForm />} />
        </Route>
        {/* private routes */}
        <Route element={<RootLayout />}>
          <Route index element={<Home />} />
          {/* // index means the default route */}
          <Route path="/explore" element={<Explore />} />
          <Route path="/saved" element={<Saved />} />
          <Route path="/all-users" element={<AllUsers />} />
          <Route path="/create-post" element={<CreatePost />} />
          <Route path="/update-post/:id" element={<EditPost />} />
          <Route path="/posts/:id" element={<PostDetails />} />
          <Route path="/profile/:id/*" element={<Profile />} />
          <Route path="/update-profile/:id" element={<UpdateProfile />} />
        </Route>
      </Routes>
      <Toaster />
      {/*  // *2 Step 2 and Step 3 is to use useToast hook in the
      component final step is to use it. */}
    </main>
  );
};

export default App;

// Steps to use react-query in the project
// 1. Make functions in appwrite/services folder
// 2. use thes functions in the react-query/queries folder
// 3. use these queries in the component to maintain the state more efficiently
