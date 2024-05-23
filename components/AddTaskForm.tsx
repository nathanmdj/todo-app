'use client'

import { Check, ChevronDown } from "lucide-react"
import {useState} from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
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
  const [value, setValue] = useState("")

  return (
    <div>
      <form className="border rounded-lg text-sm">
        <div className="p-3">
          <input type="text" placeholder="Task name" 
            className="block w-full focus:outline-none font-bold"
          />
          <input type="text" placeholder="Description" 
            className="block w-full focus:outline-none"
          />
        </div>
        <div className="border-t flex justify-between p-2">
          <div className="location">
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant={"ghost"}
                  role="combobox"
                  aria-expanded={open}
                  className="w-[100px] justify-between"
                >
                  Inbox
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
          <div className="action-btn space-x-2">
            <Button type="button"
            className="bg-stone-50 hover:bg-stone-100 text-black py-1">Cancel</Button>
            <Button type="submit"
            className="bg-orange-700 hover:bg-orange-800 py-1">Add Task</Button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default AddTaskForm