'use client'

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Check } from "lucide-react"
import { useState } from "react"
import { Flag, FlagFill } from "react-bootstrap-icons"

import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command"

import {
  FormControl,
  FormField,
  FormItem,
} from "@/components/ui/form"

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

const priority = [
  { label: "Priority 1", value: 1, color: 'text-red-500' },
  { label: "Priority 2", value: 2, color: 'text-orange-500' },
  { label: "Priority 3", value: 3, color: 'text-blue-500' },
  { label: "Priority 4", value: 4, color: 'none' },
] as const

type PriorityProps = {
  control: any;
  name: string;
  form: any;
};

const Priority:React.FC<PriorityProps> = ({control, name, form}) => {
  const [isOpen, setIsOpen] = useState(false)
  
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="">
          <Popover open={isOpen} onOpenChange={setIsOpen}>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant="outline"
                  role="combobox"
                  className={cn(
                    "min-w-[100px] justify-between h-8 p-2 text-[0.8rem]",
                    !field.value && "text-muted-foreground"
                  )}
                >
                  {field.value !== 4 ? <FlagFill className={`${priority.find((priority) => priority.value === field.value)?.color} `}/> : <Flag/>}
                             
                  {field.value
                    ? priority.find(
                        (priority) => priority.value === field.value
                      )?.label
                    : <><Flag/>Priority</>}
                  
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-[150px] p-0">
              <Command>
                <CommandGroup>
                  <CommandList>
                    {priority.map((priority) => (
                      <CommandItem
                        value={priority.label}
                        key={priority.value}
                        onSelect={() => {
                          form.setValue("priority", priority.value)
                          setIsOpen(false)
                        }}
                        className="hover:cursor-pointer flex justify-between"
                      >
                        {priority.value === 4 ? <Flag /> : <FlagFill className={`${priority.color} `}/>}
                                    
                        {priority.label}
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            priority.value === field.value
                              ? "opacity-100"
                              : "opacity-0"
                          )}
                        />
                      </CommandItem>
                    ))}
                  </CommandList>
                </CommandGroup>
              </Command>
            </PopoverContent>
          </Popover>
        </FormItem>
      )}
    />
  )
}

export default Priority