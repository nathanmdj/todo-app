import { authOptions } from '@/app/api/auth/[...nextauth]/options'
import AddTaskForm from '@/components/addTaskForm/AddTaskForm'
import { Toaster } from '@/components/ui/toaster'
import { getServerSession } from 'next-auth/next'
import React from 'react'

const Today = async() => {
  const session = await getServerSession(authOptions)
  // await fetch("http://localhost:3000/api/todo/today")
  
  return (
    <section>
      <div className="border-b border-gray-300 pb-3 mb-3">
        <h1>Today</h1>
      </div>
      <AddTaskForm/>
      <Toaster/>
    </section>
  )
}

export default Today