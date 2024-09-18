import { useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import sideImage from "../assets/images/side-image.jpg";

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
            src={sideImage}
            alt="side-img"
            className=" hidden xl:block w-1/2 h-screen bg-no-repeat object-cover"
          />
        </>
      )}
    </>
  );
};

export default AuthLayout;
