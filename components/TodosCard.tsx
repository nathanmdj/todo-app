import { TodoProps } from "@/types/types"
import { Checkbox } from "./ui/checkbox"
import { Check, Inbox } from "react-bootstrap-icons"
import { useDispatch } from "react-redux"
import { AppDispatch } from "@/redux/store"
import { completed } from "@/redux/features/todaySlice"


const TodosCard = ({todo}:TodoProps) => {
  const dispatch = useDispatch<AppDispatch>()

  let checkboxColor = 'black'
  switch (todo.priority) {
    case 1:
      checkboxColor = '!border-red-500  border-2 bg-red-100 text-red-500 hover:bg-red-200'
      break;
    case 2:
      checkboxColor = '!border-orange-500 border-2 bg-orange-100 text-orange-500 hover:bg-orange-200'
      break;
    case 3:
      checkboxColor = '!border-blue-500 bg-blue-100 text-blue-500 hover:bg-blue-200'
      break;
    case 4:
      checkboxColor = '!border-gray-500 text-gray-500'
      break;
    default:
  }
  // console.log(todo);
  const handleCompleted = async(uniqueId:string) => {
    const response = await fetch(`http://localhost:3000/api/todo/completed/${uniqueId}`, {
      method: 'PATCH',
    })
    console.log(response.ok);
    if(response.ok){
      dispatch(completed(uniqueId));
    }
  }
  return (
    <div className="py-2 border-b">
      <div className="flex items-center gap-2 ">
        <div className="group relative">
          <Checkbox 
            checked={todo.completed}
            className={`rounded-full h-5 w-5 ${checkboxColor}`}
          />
          <Check 
            className={`absolute top-0 left-1/2 -translate-x-1/2 hidden group-hover:block border-none !bg-transparent hover:cursor-pointer ${checkboxColor}`}
            onClick={()=>handleCompleted(todo.uniqueId)}
            size={24}
          />
        </div>
        <p className="text-[0.8rem]">{todo.taskname}</p>
      </div>
      <div className="ml-7 text-gray-500 text-xs">
        <p>{todo.description}</p>
      </div>
      <div className="flex justify-end text-xs items-center gap-3">
        <p className="text-gray-500">{todo.location}</p>
        <Inbox/>
      </div>
    </div>
  )
}

export default TodosCard