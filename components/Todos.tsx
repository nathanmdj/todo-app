'use client'

import { fetchTodos } from '@/redux/features/todaySlice'
import { AppDispatch, RootState } from '@/redux/store'
import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import TodosCard from './TodosCard'
import { Entity, Todo } from '@/types/types'
import { CheckCircle } from 'react-bootstrap-icons'

interface Props {
  id: string;
  completed: boolean;
}
const Todos = ({id, completed}: Props) => {
  const todoRef = useRef(false)
  const {entities, counter} = useSelector((state: RootState) => state.today)
  const dispatch = useDispatch<AppDispatch>()
  
  const filteredTodos = entities.filter((todo: Entity) => todo.completed === completed)

  useEffect(() => {
    if(todoRef.current === false) {
      dispatch(fetchTodos(id))      
    }
    return () => {
      todoRef.current = true
    }
  },[dispatch, id])  

  
  return (
    <div>
      
      <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
        <CheckCircle/>
        <p>{counter} task</p>

      </div>
      {filteredTodos?.map((todo: Todo, i : number)=>(
        <TodosCard key={i} todo={todo}/>
      ))}
    </div>
  )
}

export default Todos