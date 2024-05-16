import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/user";
import { signIn } from "next-auth/react";
import { NextResponse } from "next/server";
import encrypt from "@/lib/encrypt";

export async function POST(request:any) {
  const {name, email, password} = await request.json();
  await connectMongoDB();
  const userExists = await User.findOne({email});

  if(!userExists) { 
    const hashedPassword = await encrypt(password);
    await User.create({name, email, password: hashedPassword});
    
  } else {
    return NextResponse.json({message: 'User already exists'}, {status: 400});
  }
  
  return NextResponse.json({message: 'User created'}, {status: 201});
}