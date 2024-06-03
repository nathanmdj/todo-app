import { connectMongoDB } from "@/lib/mongodb"
import Todo from "@/models/todo"
import { NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest, response: NextResponse) {
  const sessionId = request.headers.get('Authorization');
  connectMongoDB()
  const todos = await Todo.find({userId: sessionId})
  const filteredTodos = todos.map((todo)=>{
    const { _id, taskname, description, date, priority, location, userId, uniqueId, completed } = todo
    
    return { _id, taskname, description, date, priority, location, userId, uniqueId, completed }
  })
  return NextResponse.json(filteredTodos)
}