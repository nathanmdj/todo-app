import type {NextAuthOptions} from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from 'next-auth/providers/google'
import CredentialsProvider from "next-auth/providers/credentials";
import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/user";
import { verify } from "@/lib/encrypt";
import { randomBytes } from "crypto";

export const authOptions: NextAuthOptions = {
  providers: [
    
    CredentialsProvider({
      name: "existing account",
      credentials: {
        email: { label: "Username", type: "text", placeholder: "jsmith" },
        password: {  label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        const {email} = req.body || {};
        
        connectMongoDB();
        const user = await User.findOne({email}); 

               
        const passwordOk = await verify(credentials?.password as string, user?.password as string);
        if(credentials?.email === user.email && passwordOk) {
          return user
        } else {
          return null
        }
      }
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
    })
  ],
  pages: {
    signIn: '/login',
  },
  session: {
    strategy: 'jwt'
  },
  callbacks: {
    async signIn({user,account}) {
      const{name, email} = user
      
      try {
        if(account?.provider === 'google' || 'github') {
          await connectMongoDB();
          const password = randomBytes(16).toString('hex');
          const userExists = await User.findOne({email});
          
          if(!userExists) {
            await fetch("http://localhost:3000/api/user", {
              method: "POST",
              headers: {
                "Content-Type": "application/json"
              },
              body: JSON.stringify(
                {name, email, password}
              )
            })
          }
        }
      } catch (error) {
        console.log(error);
        
      }
      return true;
    },
    jwt({token, user, account}) {
      
      if(user) {
        token.user = user
      }
      return token
    },
    async session({session, token}) {
      if (session?.user) {
        session.user.id = token.user.id || token.user._id as string;
        
      }
      
      return session;
    }
  }
}