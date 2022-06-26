import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";


export function useAuth() {
  const { user, signIn } = useContext(AuthContext);

  return { user, signIn }
}