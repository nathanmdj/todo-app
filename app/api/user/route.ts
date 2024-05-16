import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/user";
import { NextResponse } from "next/server";

export async function POST(request:any) {
  const {name, email, password} = await request.json();
  try {
    await connectMongoDB();
    await User.create({name, email, password});
  } catch (error) {
    NextResponse.json({ message: 'Error creating user', error: error }, {status: 500});
  }

  return NextResponse.json({message: 'User created'}, {status: 201});
}