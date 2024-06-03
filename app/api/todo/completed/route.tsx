import { connectMongoDB } from "@/lib/mongodb";
import Todo from "@/models/todo";
import { NextRequest, NextResponse } from "next/server";


export async function UPDATE(request: NextRequest) {
  
  
  try {
    await connectMongoDB();
    await Todo.findOneAndUpdate({uniqueId: request.nextUrl.searchParams.get('uniqueId')}, {completed: true});
    return NextResponse.json({ message: 'Todo updated' }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: 'Error updating todo', error: error }, { status: 500 });
  }
}