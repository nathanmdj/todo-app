'use client'

import { Check, ChevronDown } from "lucide-react"
import {useState} from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {Calendar} from "@/components/ui/calendar"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command"

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { CommandList } from "cmdk"
import { CalendarEvent, Flag, Plus, PlusCircleFill } from "react-bootstrap-icons"


const frameworks = [
  {
    value: "inbox",
    label: "Inbox",
  },
  {
    value: "project-x",
    label: "Project X",
  },
  
]

const AddTaskForm = () => {
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState("inbox")
  const [date, setDate] = useState(new Date())
  const [taskName, setTaskName] = useState('')
  const [description, setDescription] = useState('')
  const [Priority, setPriority] = useState('')
  const [show, setShow] = useState(false)
  const [addTaskIsHover, setAddTaskIsHover] = useState(false)
  const [isTaskEmpty, setIsTaskEmpty] = useState(true)

  return (
    <div>
      <Button
        variant="ghost"
        className={`justify-between p-0 gap-2 hover:bg-white hover:text-orange-600 ${show ? 'hidden' : 'flex'}`}
        onClick={() => setShow(true)}
        onMouseEnter={() => setAddTaskIsHover(true)}
        onMouseLeave={() => setAddTaskIsHover(false)}
      >
        {addTaskIsHover ? <PlusCircleFill size={24} className="text-orange-600"/> : <Plus size={24} className="text-orange-600"/> }
        
        <span>Add Task</span>
      </Button>
      <form className={`border rounded-lg text-sm ${show ? 'block' : 'hidden'}`}>
        <div className="p-3">
          <input type="text" placeholder="Task name" 
            className="block w-full focus:outline-none font-bold"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
          />
          <input type="text" placeholder="Description" 
            className="block w-full focus:outline-none mt-2"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <div className="mt-5 flex gap-3">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                type="button"
                variant={"outline"}
                className="text-xs text-green-700 p-2 h-8 flex justify-between gap-2 items-center"
              >
                <CalendarEvent/>
                <span>Today</span>
              </Button> 
            </PopoverTrigger>
            <PopoverContent className="p-0">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-md border"
                initialFocus
              />
            </PopoverContent>
          </Popover>
          <Button
            type="button"
            variant={"outline"}
            className="text-xs p-2 h-8 flex justify-between gap-2 items-center"
          >
            <Flag/>
            <span>Priority</span>
          </Button>
        </div>
        </div>
        
        <div className="border-t flex justify-between p-2">
          <div className="location">
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant={"ghost"}
                  role="combobox"
                  aria-expanded={open}
                  className="w-[100px] justify-between h-8 p-1"
                >
                  {frameworks.map((framework)=>(
                    <span key={framework.value}>
                      {framework.value === value ? 
                        framework.label : null                     
                      }
                    </span>
                  ))}
                  <ChevronDown size={16}/>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[200px] p-0">
                <Command>
                  <CommandInput placeholder="Search..." />
                  <CommandEmpty>No project found</CommandEmpty>
                  <CommandGroup>
                    <CommandList>
                      {frameworks?.map((framework) => (
                        <CommandItem
                          key={framework.value}
                          value={framework.value}
                          onSelect={(currentValue) => {
                            setValue(currentValue === value ? "" : currentValue)
                            setOpen(false)
                          }}
                          className="hover:bg-stone-200 hover:cursor-pointer"
                        >
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              value === framework.value ? "opacity-100" : "opacity-0"
                            )}
                          />
                          {framework.label}
                          
                        </CommandItem>
                      ))}
                    </CommandList>
                  </CommandGroup>
                </Command>
              </PopoverContent>
            </Popover>
          </div>
          <div className="flex">
            <div className="action-btn space-x-2">
              <Button type="button"
                onClick={() => setShow(false)}
                className="bg-stone-50 hover:bg-stone-100 text-black h-8"
              >Cancel</Button>
              <Button type="submit"
              className={`bg-orange-600 hover:bg-orange-700 h-8 ${isTaskEmpty ? `hover:cursor-not-allowed` : ''}`}
              disabled={isTaskEmpty}
              >Add Task</Button>
            </div>

          </div>
        </div>
      </form>
    </div>
  )
}

export default AddTaskForm