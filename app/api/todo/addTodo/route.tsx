import { connectMongoDB } from "@/lib/mongodb";
import Todo from "@/models/todo";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { taskname, description, date, priority, location, userId, uniqueId } = await request.json();
  console.log(date);
  
  try {
    await connectMongoDB();
    await Todo.create({ taskname, description, date, priority, location, userId, uniqueId });
    return NextResponse.json({ message: 'Todo added' }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: 'Error adding todo', error: error }, { status: 500 });
  }
}


