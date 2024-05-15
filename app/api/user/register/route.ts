import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/user";
import { signIn } from "next-auth/react";
import { NextResponse } from "next/server";

export async function POST(request:any) {
  const {name, email, password} = await request.json();
  await connectMongoDB();
  const userExists = await User.findOne({email});

  if(!userExists) { 
    await User.create({name, email, password});
    
  } else {
    return NextResponse.json({message: 'User already exists'}, {status: 400});
  }
  
  return NextResponse.json({message: 'User created'}, {status: 201});
}