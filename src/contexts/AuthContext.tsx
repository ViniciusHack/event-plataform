import { GithubAuthProvider, signInWithPopup } from "firebase/auth";
import { createContext, ReactNode, useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
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
    if(social === "github") {
        const result = await signInWithPopup(auth, githubProvider);
  
        if(!result.user.displayName || !result.user.email) {
          return toast.error("Informações não suficientes (nome e email são necessários)")
        }
  
        const newUser = {
          name: result.user.displayName,
          email: result.user.email
        }
  
      setUser(newUser);
      
      const { errors } = await createSubscriber({
        variables: {
          name: newUser.name,
          email: newUser.email
        }
      });

      if(errors) {
        return errors.forEach(err => {
          console.log({err})
          toast.error(err.message)
        }) 
      }
      cookie.set("user", newUser);

    } else if(newUser) {
      setUser(newUser);
      cookie.set("user", newUser);
    } else {
      return toast.error("You need to pass either a social or a user as parameter");
    }
    navigate('/event')
  },[])

  return (
    <AuthContext.Provider value={{ signIn, user }}>
      {children}
    </AuthContext.Provider>
  )
}