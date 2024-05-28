import { TodoProps } from "@/types/types"
import { Checkbox } from "./ui/checkbox"



const Todos = ({todo}:TodoProps) => {
  

  return (
    <div className="py-3">
      <div className="flex items-center gap-2">
        <Checkbox className="rounded-full"/>
        <p>{todo.taskname}</p>
      </div>
      <div className="ml-6">
        <p>{todo.description}</p>
      </div>
    </div>
  )
}

export default Todos