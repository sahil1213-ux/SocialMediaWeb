import Bottombar from "@/components/Shared/Bottombar";
import LeftSideBar from "@/components/Shared/LeftSideBar";
import Topbar from "@/components/Shared/Topbar";
import { Outlet } from "react-router-dom";

const RootLayout = () => {
  return (
    <div className=" w-full md:flex">
      <Topbar />
      <LeftSideBar />
      <section className=" flex flex-1 h-full">
        <Outlet />
      </section>

      <Bottombar />
    </div>
  );
};

export default RootLayout;
