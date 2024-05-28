import { Session, User } from 'next-auth';

declare module 'next-auth' {
  interface Session {
    // Add your custom session properties here
    user: {
      id: string;
      
    }
  }

  interface User {
    // Add your custom user properties here
    id?: string;
   _id?: string;
  }
}