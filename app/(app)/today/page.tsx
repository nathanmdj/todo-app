import { authOptions } from '@/app/api/auth/[...nextauth]/options'
import Todos from '@/components/Todos'
import AddTaskForm from '@/components/addTaskForm/AddTaskForm'
import { Toaster } from '@/components/ui/toaster'
import axios from 'axios'
import { getServerSession } from 'next-auth/next'
import React from 'react'

const Today = async() => {
  const session = await getServerSession(authOptions)
  const todos = await axios.get("http://localhost:3000/api/todo/today", {
    headers: {
      Authorization: `${session?.user.id}`
    }
  })
  
  // console.log(todos.data);
  
  return (
    <section>
      <div className="border-b border-gray-300 pb-3 mb-3">
        <h1>Today</h1>
      </div>
      {todos.data.map((todo)=>(
      
         <Todos key={todo._id} todo={todo}/>
      ))}
      {/* <Todos/> */}
      <AddTaskForm user={session?.user}/>
      <Toaster/>
    </section>
  )
}

export default Today