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

function getMaxAgeFromCookie(cookie: string) {
    const maxAgeMatch = cookie.match(/Max-Age=(\d+)/);
    return maxAgeMatch ? parseInt(maxAgeMatch[1], 10) : null;
}

// function getExpiresFromCookie(cookie: string) {
//     const maxAgeMatch = cookie.match(/Expires=(\d+)/);
//     return maxAgeMatch ? parseInt(maxAgeMatch[1], 10) : null;
// }

function getExpiresFromCookie(cookie: string) {
    const expiresMatch = cookie.match(/Expires=([^;]+)/);
    return expiresMatch ? new Date(expiresMatch[1]) : null;
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
                const maxAge = getMaxAgeFromCookie(data.cookie);
                const expires = getExpiresFromCookie(data.cookie);

                console.log(data.cookie);

                console.log('maxAge:', maxAge)
                console.log('expires:', expires)

                return data.user;
            }

            console.log('Invalid credentials');
            return null;
        },
    }),],
});
