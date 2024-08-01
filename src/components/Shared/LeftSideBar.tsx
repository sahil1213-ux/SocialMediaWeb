import { Button } from "@/@/components/ui/button";
import { sidebarLinks } from "@/constants";
import { useUserContext } from "@/context";
import { INavLink } from "@/types";
import { Link, NavLink, useLocation } from "react-router-dom";

const LeftSideBar = () => {
  const { user } = useUserContext();
  const { pathname } = useLocation();
  return (
    <nav className=" leftsidebar">
      <div className=" flex flex-col gap-11">
        <Link to="/" className=" flex gap-3 items-center">
          <img
            src="/assets/images/logo.svg"
            alt="logo"
            width={170}
            height={36}
          />
        </Link>
        <Link to={`/profile/${user.id}`} className=" flex-center gap-3">
          <img
            src={user.imageUrl || "/assets/images/profile.png"}
            alt="profile"
            className=" rounded-full h-14 w-14"
          />
          <div className=" flex flex-col">
            <p className=" body-bold">{user.name}</p>
            <p className=" body-light">{user.email}</p>
          </div>
        </Link>

        {/* group is the word use to highlight icon and text */}
        <ul className=" flex flex-col gap-6 group">
          {sidebarLinks.map((link: INavLink) => {
            const isActive = pathname === link.route;
            return (
              <li
                key={link.label}
                className={`leftsidebar-link ${isActive && "bg-primary-500"}`}
              >
                <NavLink
                  to={link.route}
                  className="flex gap-4 items-center p-4"
                >
                  <img
                    src={link.imgURL}
                    alt={link.label}
                    className={`group-hover:invert-white ${
                      isActive && "invert-white"
                    }`}
                  />
                  {link.label}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </div>
      <Button
        variant="ghost"
        className=" shad-button_ghost"
        onClick={() => console.log("logout")}
      >
        <img src="/assets/icons/logout.svg" alt="logout" />
        {""}
        logout
      </Button>
    </nav>
  );
};

export default LeftSideBar;
