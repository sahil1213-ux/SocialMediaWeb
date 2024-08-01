import { Button } from "@/@/components/ui/button";
import { useUserContext } from "@/context";
import { useSignOutAccount } from "@/react-query/queriesAndMutations";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const Topbar = () => {
  const { mutateAsync: signOut, isSuccess } = useSignOutAccount();
  const navigate = useNavigate();
  const { user } = useUserContext();

  useEffect(() => {
    if (isSuccess) {
      navigate(0);
    }
  }, [isSuccess]);
  return (
    <section className=" topbar">
      <div className=" flex-between py-4 px-5">
        <Link to="/" className=" flex gap-3 items-center">
          <img
            src="/assets/images/logo.svg"
            alt="logo"
            width={130}
            height={325}
          />
        </Link>

        <div className=" flex gap-4">
          <Button
            variant="ghost"
            className=" shad-button_ghost"
            onClick={() => signOut()}
          >
            <img src="/assets/icons/logout.svg" alt="logout" />
          </Button>
          <Link to={`/profile/${user.id}`} className=" flex-center gap-3">
            <img
              src={user.imageUrl || "/assets/images/profile.png"}
              alt="profile"
              className=" rounded-full h-8 w-8"
            />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Topbar;
