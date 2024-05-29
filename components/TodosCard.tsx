import { TodoProps } from "@/types/types"
import { Checkbox } from "./ui/checkbox"
import { Inbox } from "react-bootstrap-icons"



const TodosCard = ({todo}:TodoProps) => {
  
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
      checkboxColor = '!border-gray-500 ho'
      break;
    default:
  }
  
  return (
    <div className="py-2 border-b">
      <div className="flex items-center gap-2 ">
        <Checkbox 
          className={`rounded-full h-5 w-5 ${checkboxColor}`}
        />
        <p className="text-sm">{todo.taskname}</p>
      </div>
      <div className="ml-7 text-gray-500 text-sm">
        <p>{todo.description}</p>
      </div>
      <div className="flex justify-end text-[0.8rem] items-center gap-3">
        <p className="text-gray-500">Inbox</p>
        <Inbox/>
      </div>
    </div>
  )
}

export default TodosCard