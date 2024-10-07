import NextAuth from 'next-auth';
import {authConfig} from './auth.config';
import { NextResponse } from 'next/server';
import axiosInstance from "./app/lib/axiosInstance";
import {verifyCookie} from "@/auth";  // Assuming this is the function that verifies cookie

// export default NextAuth(authConfig).auth;

// export const config = {
//     // https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
//     matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
// };

export async function middleware(req: NextResponse, res: NextResponse) {
    // const token = req.cookies.get('jwt');
    //
    // // Redirect to login if no token is found
    // if (!token) {
    //     return NextResponse.redirect(new URL('/login', req.url));
    // }
    //
    // // Verify the token (using your verifyCookie function or similar)
    // const isValidToken = await verifyCookie(token);

    const response = await verifyCookie();
    if (response) {
        console.log(response);
    } else {
        return NextResponse.redirect(new URL('/login', req.url));
    }


    // If the token is not valid, redirect to login
    // if (!isValidToken) {
    //     return NextResponse.redirect(new URL('/login', req.url));
    // }

    // Allow the request to proceed if authenticated
    return NextResponse.next();
}

export const config = {
    matcher: ['/dashboard/:path*', '/invoices/:path*'],  // Protect both dashboard and invoices routes
};
