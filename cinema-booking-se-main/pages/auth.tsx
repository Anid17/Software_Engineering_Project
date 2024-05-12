import Input from "@/components/Input";
import axios from 'axios';
import { useCallback, useState } from "react";
import { signIn } from 'next-auth/react';
import { useRouter } from "next/router";


const Auth = () => {
    const router = useRouter();
    const[email, setEmail] = useState('');
    const[firstName, setFirstName] = useState('');
    const[lastName, setLastName] = useState('');
    const[password, setPassword] = useState('');

    const[variant, setVariant] = useState('login');

    const login = useCallback(async () => {
        try {
            await signIn('credentials',{
                email,
                password,
                redirect: false,
                callbackUrl: '/'
            });
            router.push('/');
        } catch(error) {
            console.log(error);
        }
    }, [email, password, router]); 

    const register = useCallback(async () => {
        try {
            await axios.post('/api/register', {
                firstName,
                lastName,
                email,
                password
            });

            login();
        } catch(error) {
            console.log(error);
        }
    }, [firstName, lastName, email, password, login]); 

    
    const toggleVariant = useCallback(() => {
        setVariant((currentVariant) => currentVariant === 'login'? 'register' : 'login'); 
    },[])


    return(
        <div className="w-full min-h-[100vh] bg-[url('/images/auth_bg.png')] bg-cover flex justify-center items-center">
            <div className="ss:w-[500px] w-full px-[9.5vw] ss:px-0 h-full">
                <div className="flex flex-col">
                    <h3 className="font-montserrat text-[34px] text-white font-bold mb-[36px]">
                       {variant === 'login'? 'Get Started' : 'Welcome Back'}
                    </h3>
                    {variant === 'register' && (
                        <div className="flex flex-col ss:flex-row ss:gap-[16px] w-full">
                            <Input
                                id="firstName"
                                onChange={(ev)=> setFirstName(ev.target.value)}
                                value={firstName}
                                type="text"
                                label="First Name"
                                placeholder="John"
                            />
                            <Input
                                id="lastName"
                                onChange={(ev)=> setLastName(ev.target.value)}
                                value={lastName}
                                type="text"
                                label="Last Name"
                                placeholder="Doe"
                            />
                        </div>
                    )}
                    <Input
                        id="email"
                        onChange={(ev)=> setEmail(ev.target.value)}
                        value={email}
                        type="email"
                        label="Email"
                        placeholder="hello@example.com"
                     />

                    <Input
                        id="password"
                        onChange={(ev)=> setPassword(ev.target.value)}
                        value={password}
                        type="password"
                        label="Password"
                        placeholder=""
                     />

                    <button onClick={variant==='login'? login: register} className="rounded-[10px] bg-accent p-[16px] text-[16px] font-opensans text-white font-bold uppercase my-[20px]">
                        {variant==='login'? 'Login' : 'Register'}
                    </button>
                    <p className="text-center text-text">{variant==='login'? "Don't have an account?" : "Already have an account?"} <span onClick={toggleVariant} className="text-white font-bold cursor-pointer">{variant==='login'? 'Register' : 'Login'}</span></p>
                </div>
            </div>
        </div>
    );
}

export default Auth;