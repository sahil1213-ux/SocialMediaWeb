import { useState } from "react";
import { Navigate, Outlet } from "react-router-dom";

const AuthLayout = () => {
  const [isAuth] = useState(false);

  return (
    <>
      {isAuth ? (
        <Navigate to="/" />
      ) : (
        <>
          <section className=" flex flex-col justify-center items-center flex-1 py-10">
            <Outlet />
          </section>
          <img
            src="/public/assets/images/side-img.svg"
            alt="side-img"
            className=" hidden xl:block w-1/2 h-screen bg-no-repeat object-cover"
          />
        </>
      )}
    </>
  );
};

export default AuthLayout;
