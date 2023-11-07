import { createContext, useEffect, useState } from "react"; 
import { recoveUserInformation, singInRequest } from "../services/auth"
import { setCookie, parseCookies } from 'nookies'
import { useRouter } from 'next/router'
import { api } from "../services/api";

type AuthContextType = { 
    IsAuthenticated:boolean;
    user: User;
    signIn: (data: SingInData) => Promise<void>
    
}
type SingInData = {
    email:string;   
    password: string;   
}
type User = {
    name:string;
    email:string;
    avatar_url:string
}

export const AuthContext = createContext({} as AuthContextType)

export function AuthProvide({ children }) {

    const [user, setUser] = useState<User | null>(null) 
    const router = useRouter()

    const IsAuthenticated = !!user;

    useEffect(()=>{
        const { 'nextauth.token':token }=parseCookies()

        if(token) 
        {
            recoveUserInformation().then(response =>
                setUser(response.user))
        }

    },[])

    async function signIn({email, password}: SingInData) {
      const { token, user } = await singInRequest({
        email,
        password,
      })
 
      setCookie(undefined, 'nextauth.token', token, {
        maxAge : 60 * 60 * 1, // 1hr 
      })

      setUser(user)
      api.defaults.headers['Authorization']=`Bearer ${token}`;

      
      router.push('/dashboard');
    }

    return (  
        <AuthContext.Provider value={{user, IsAuthenticated, signIn }}>
            {children}
        </AuthContext.Provider>
      )
}