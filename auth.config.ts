import type {NextAuthConfig} from 'next-auth';

const sessionMaxAge = 20 * 60 * 60; // 20hr

export const authConfig = {
    pages: {
        signIn: '/login',
    }, callbacks: {
        authorized({auth, request: {nextUrl}}) {
            const isLoggedIn = !!auth?.user;
            const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');
            if (isOnDashboard) {
                if (isLoggedIn) return true;
                return false; // Redirect unauthenticated users to login page
            } else if (isLoggedIn) {
                return Response.redirect(new URL('/dashboard', nextUrl));
            }
            return true;
        }, async session({session, user, token}) {
            return session
        },
    }, providers: [], session: {
        strategy: 'jwt', maxAge: sessionMaxAge
    },
} satisfies NextAuthConfig;