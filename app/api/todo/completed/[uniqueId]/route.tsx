import { connectMongoDB } from "@/lib/mongodb";
import Todo from "@/models/todo";
import { NextRequest, NextResponse } from "next/server";

interface Params {
  uniqueId: string
}
export async function PATCH(request: NextRequest, context: { params: Params }) {
  const uniqueId = context.params.uniqueId
  
  try {
    await connectMongoDB();
    await Todo.findOneAndUpdate(
      { uniqueId: uniqueId },
      { $set: { completed: true } }
    );
    return NextResponse.json({ message: 'Todo updated' }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: 'Error updating todo', error: error }, { status: 500 });
  }
}