import { GithubAuthProvider, signInWithPopup } from "firebase/auth";
import { createContext, ReactNode, useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookie from 'universal-cookie';
import { useCreateSubscriberMutation } from "../graphql/generated";
import { auth } from "../lib/firebase";

type User = {
  name: string;
  email: string;
}

type AuthContextType = {
  signIn: (param: SignInParams) => void;
  user: User | null;
}

type AuthProviderType = {
  children: ReactNode;
}

type SignInParams = {
  social?: "github",
  newUser?: User;
}

export const AuthContext = createContext({} as AuthContextType);

export const cookie = new Cookie();

export function AuthProvider({ children }: AuthProviderType) {
  const [user, setUser] = useState<User | null>(null);
  const githubProvider = new GithubAuthProvider();
  const [createSubscriber, { loading }] = useCreateSubscriberMutation();
  
  const navigate = useNavigate();

  const signIn = useCallback(async ({ newUser, social }: SignInParams) => {
    if(social === "github" && !user) {
      try {
        const result = await signInWithPopup(auth, githubProvider);
  
        if(!result.user.displayName || !result.user.email) {
          throw new Error("Informações não suficientes (nome e email são necessários)")
        }
  
        const newUser = {
          name: result.user.displayName,
          email: result.user.email
        }
  
      setUser(newUser);
      await createSubscriber({
        variables: {
          name: newUser.name,
          email: newUser.email
        }
      });

      cookie.set("user", newUser)
      } catch(err) {
        throw new Error(String(err));
      }
    } else if(newUser) {
      setUser(newUser);
      cookie.set("user", newUser)
    } else {
      throw new Error("You need to pass either a social or a user as parameter");
    }
    navigate('/event')
  },[])

  return (
    <AuthContext.Provider value={{ signIn, user }}>
      {children}
    </AuthContext.Provider>
  )
}