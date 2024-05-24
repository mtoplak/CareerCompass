import NextAuth, { DefaultSession, DefaultUser } from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
    interface Session {
        user: {
            id: string;
            company?: any;
        } & DefaultSession["user"];
    }

    interface User {
        id: string;
        company?: any;
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        id: string;
        company?: any;
    }
}
