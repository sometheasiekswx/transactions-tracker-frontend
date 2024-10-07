import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import {authConfig} from './auth.config';
import {z} from 'zod';
import type {User} from '@/app/lib/definitions';
import {users} from "@/app/lib/placeholder-data";
import axiosAuthService from "@/app/lib/axiosAuthService";

async function getUser(email: string): Promise<User | undefined> {
    try {
        const user = users.filter((user: User) => user.email === email);
        return user[0];
    } catch (error) {
        console.error('Failed to fetch user:', error);
        throw new Error('Failed to fetch user.');
    }
}

export async function verifyCookie() {
    try {
        const response = await axiosAuthService.get('/verify-cookie');
        if (response){
            console.log(response.data);
        }
        if (response.status === 200) {

            return response.data.user;  // Token is valid, return user data
        }
    } catch (error) {
        console.error('Token verification failed:', error);
        return null;  // Token is invalid or expired
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
                const response  = await axiosAuthService.post('/login', {
                    email,password
                }, {withCredentials: true});

                const setCookieHeader = response.headers['set-cookie'];
                console.log(setCookieHeader);

                if (response.status !== 200) return null

                if (!response.data.user) return null;

                return response.data.user;
            }

            console.log('Invalid credentials');

            return null;
        },
    }),],
});