import NextAuth, { DefaultSession, DefaultUser } from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
    interface Session {
        user: {
            id: string;
            company?: string;
        } & DefaultSession["user"];
    }

    interface User {
        id: string;
        company?: string;
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        id: string;
        company?: string;
    }
}
