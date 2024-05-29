"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { Check, ChevronDown } from "lucide-react"
import { useForm } from "react-hook-form"
import {  date, z } from "zod"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import axios from "axios"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
} from "@/components/ui/form"

import { toast } from "@/components/ui/use-toast"
import { useState } from "react"
import { Plus, PlusCircleFill } from "react-bootstrap-icons"
import { Input } from "../ui/input"
import Priority from "./Priority"
import Location from "./Location"
import DueDate from "./DueDate"
import { User } from "next-auth"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "@/redux/store"
import { addTodo } from "@/redux/features/todaySlice"

const FormSchema = z.object({
  location: z.string(),
  taskname: z.string().min(1),
  description: z.string().min(1),
  date: z.date(),
  priority: z.string(),
})


const AddTaskForm2 = ({user} : {user: User}) => {
  const [show, setShow] = useState(false)
  const [addTaskIsHover, setAddTaskIsHover] = useState(false)
  const {entities, counter} = useSelector((state: RootState) => state.today)
  const dispatch = useDispatch<AppDispatch>()

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      location: "inbox",
      taskname: "",
      description: "",
      priority: "4",
    }
  })

  const {formState: {isValid}} = form
  const onSubmit = async(data: z.infer<typeof FormSchema>) => {
    const postData = {...data, userId: user.id}
    
    const response = await axios.post("http://localhost:3000/api/todo/addTodo", JSON.stringify(postData))
    toast({
      title: "Task added",
      description: (
        <pre className="">
          <code className="">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    })
    dispatch(addTodo(data))
    setShow(false);
    form.reset();
  }
  
  return (
    <>
     <Button
        type="button"
        variant="ghost"
        className={`justify-between p-0 gap-2 hover:bg-white hover:text-orange-600 ${show ? 'hidden' : 'flex'}`}
        onClick={() => setShow(true)}
        onMouseEnter={() => setAddTaskIsHover(true)}
        onMouseLeave={() => setAddTaskIsHover(false)}
      >
        {addTaskIsHover ? <PlusCircleFill size={24} className="text-orange-600"/> : <Plus size={24} className="text-orange-600"/> }
        
        <span>Add Task</span>
      </Button>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className={`space-y-6 border rounded-lg ${show ? 'block' : 'hidden'}`}>
          <div className="p-3">
            <FormField
              control={form.control}
              name="taskname"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Task name" {...field} 
                      className="border-none !ring-transparent p-0 h-8 font-bold"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                  <Input placeholder="Description" {...field} 
                      className="border-none !ring-transparent p-0 h-8"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <div className="flex gap-3">
              <DueDate
                control={form.control}
                name={'date'}      
                form={form}
              />
              <Priority 
                control={form.control}
                name={'priority'}      
                form={form}
              />
            </div>
          </div>
          <div className="flex justify-between border-t p-3" style={{marginTop: '0px'}}>
            <Location 
              control={form.control}
              name={'location'}      
              form={form}
            />
            <div className="action-btn space-x-2">
              <Button 
                type="button"
                onClick={() => setShow(false)}
                className="bg-stone-50 hover:bg-stone-100 text-black h-8"
              >Cancel</Button>
              <Button 
                type="submit"
                disabled={!isValid}
                className={`bg-orange-600 hover:bg-orange-700 h-8`}
              >Add Task</Button>

            </div>
          </div>
        </form>
      </Form>
    </>
  )
}

export default AddTaskForm2;