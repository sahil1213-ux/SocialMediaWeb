import { useContext } from "react";
import { AuthContext } from "./Authcontext";

export const useUserContext = () => useContext(AuthContext);