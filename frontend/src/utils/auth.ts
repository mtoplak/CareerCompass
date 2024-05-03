import bcrypt from "bcrypt";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import EmailProvider from "next-auth/providers/email";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import { prisma } from "./prismaDB";
import type { Adapter } from "next-auth/adapters";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import { MongoClient, ServerApiVersion } from "mongodb";

// This approach is taken from https://github.com/vercel/next.js/tree/canary/examples/with-mongodb
if (!process.env.MONGODB_URI) {
  throw new Error('Invalid/Missing environment variable: "MONGODB_URI"');
}

const uri = process.env.MONGODB_URI;
const options = {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
};

let client;
let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === "development") {
  // In development mode, use a global variable so that the value
  // is preserved across module reloads caused by HMR (Hot Module Replacement).
  let globalWithMongo = global as typeof globalThis & {
    _mongoClientPromise?: Promise<MongoClient>;
  };

  if (!globalWithMongo._mongoClientPromise) {
    client = new MongoClient(uri, options);
    globalWithMongo._mongoClientPromise = client.connect();
  }
  clientPromise = globalWithMongo._mongoClientPromise;
} else {
  // In production mode, it's best to not use a global variable.
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

// Export a module-scoped MongoClient promise. By doing this in a
// separate module, the client can be shared across functions.
export default clientPromise;

export const authOptions: NextAuthOptions = {
  pages: {
    signIn: "/auth/prijava",
  },
  adapter: MongoDBAdapter(clientPromise), //PrismaAdapter(prisma) as Adapter,
  secret: process.env.SECRET,
  session: {
    strategy: "jwt",
  },

  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "miha.novak@email.com" },
        password: { label: "Geslo", type: "password" },
        username: { label: "Username", type: "text", placeholder: "mihanovak" },
      },

      async authorize(credentials) {
        // check to see if email and password is there
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Izpolnite vsa polja.");
        }
        // console.log(credentials);

        let user;
        if (authOptions && authOptions.adapter && authOptions.adapter.getUserByEmail) {
          user = await authOptions.adapter.getUserByEmail(credentials.email);
          console.log(user);
        } else {
          console.error("authOptions.adapter is undefined or null");
        }

        console.log(user);

        return user || null;
        // check to see if user already exist
        // const user = await prisma.user.findUnique({
        //   where: {
        //     email: credentials.email,
        //   },
        // });



        // if user was not found
        // if (!user || !user?.password) {
        //   throw new Error("In valid email or password");
        // }

        // check to see if passwords match
        // const passwordMatch = await bcrypt.compare(
        //   credentials.password,
        //   user.password,
        // );

        // console.log(passwordMatch);

        // if (!passwordMatch) {
        //   console.log("test", passwordMatch);
        //   throw new Error("Incorrect password");
        // }

        // return user;
      },
    }),

    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),

    EmailProvider({
      server: {
        host: process.env.EMAIL_SERVER_HOST,
        port: Number(process.env.EMAIL_SERVER_PORT),
        auth: {
          user: process.env.EMAIL_SERVER_USER,
          pass: process.env.EMAIL_SERVER_PASSWORD,
        },
      },
      from: process.env.EMAIL_FROM,
    }),
  ],

  callbacks: {
    jwt: async (payload: any) => {
      // console.log(payload);
      const { token } = payload;
      const user = payload.user;

      if (user) {
        return {
          ...token,
          id: user.id,
        };
      }
      return token;
    },

    session: async ({ session, token }) => {
      // console.log(session);
      // console.log(token);
      if (session?.user) {
        return {
          ...session,
          user: {
            ...session.user,
            id: token?.id,
          },
        };
      }
      return session;
    },
  },

  // debug: process.env.NODE_ENV === "developement",
};
