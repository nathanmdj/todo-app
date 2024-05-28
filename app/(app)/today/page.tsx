import { authOptions } from '@/app/api/auth/[...nextauth]/options'
import Todos from '@/components/Todos'
import AddTaskForm from '@/components/addTaskForm/AddTaskForm'
import { Toaster } from '@/components/ui/toaster'
import { Todo } from '@/types/types'
import axios from 'axios'
import { User } from 'next-auth'
import { getServerSession } from 'next-auth/next'
import React from 'react'


const Today = async() => {
  const session = await getServerSession(authOptions)
  const todos = await axios.get("http://localhost:3000/api/todo/today", {
    headers: {
      Authorization: `${session?.user?.id}` 
    }
  })
  
  return (
    <section>
      <div className="border-b border-gray-300 pb-3 mb-3">
        <h1>Today</h1>
      </div>
      {todos.data.map((todo: Todo, i : number)=>(
      
         <Todos key={i} todo={todo}/>
      ))}
      {/* <Todos/> */}
      {session?.user && <AddTaskForm user={session.user} />}
      <Toaster/>
    </section>
  )
}

export default Today