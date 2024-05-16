import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/user";
import { NextResponse } from "next/server";

export async function DELETE(request:any) {
  connectMongoDB();
  
  try {
    const result= await User.deleteMany({});
    NextResponse.json({ message: 'User deleted', result: result.deletedCount });
  } catch (error) {
    NextResponse.json({ message: 'Error deleting user', error: error });
  }
}