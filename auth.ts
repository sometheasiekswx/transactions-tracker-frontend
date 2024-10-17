import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import {authConfig} from './auth.config';
import {z} from 'zod';
import axiosAuth from "@/app/lib/axios/axiosAuth";
import {cookies} from "next/headers";

async function signInUser(email: string, password: string): Promise<any> {
    try {
        let data = JSON.stringify({
            "email": email, "password": password
        });
        const response = await axiosAuth.post('/login', data, {headers: {'Content-Type': 'application/json'}})
        if (response.status === 200) {
            return {user: response.data['user'], 'cookie': response.headers['set-cookie']![0]}
        } else {
            console.error(response);
            return undefined;
        }
    } catch (error) {
        console.error('Failed to sign in user:', error);
        throw new Error('Failed to sign in user.');
    }

}

export const {auth, signIn, signOut} = NextAuth({
    ...authConfig, providers: [Credentials({
        async authorize(credentials) {
            const parsedCredentials = z
                .object({email: z.string().email(), password: z.string().min(6)})
                .safeParse(credentials);

            if (parsedCredentials.success) {
                const {email, password} = parsedCredentials.data;
                const data = await signInUser(email, password)
                if (!data) {
                    return null;
                }

                cookies().set('jwt.cookie', data.cookie);

                return data.user;
            }

            console.log('Invalid credentials');
            return null;
        },
    }),],
});
