'use client'

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Check } from "lucide-react"
import { useState } from "react"
import { Flag, FlagFill } from "react-bootstrap-icons"
import { addDays, format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
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
import { Calendar } from "../ui/calendar"

const priority = [
  { label: "Priority 1", value: "1", color: 'red-500' },
  { label: "Priority 2", value: "2", color: 'orange-500' },
  { label: "Priority 3", value: "3", color: 'blue-500' },
  { label: "Priority 4", value: "4", color: 'none' },
] as const

type PriorityProps = {
  control: any;
  name: string;
  form: any;
};

const DueDate:React.FC<PriorityProps> = ({control, name, form}) => {
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
                      variant={"outline"}
                      className={cn(
                        "pl-3 text-left font-normal text-[.8rem] h-8",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Due Date</span>
                      )}
                      <CalendarIcon className="ml-2 h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={(date) => {
                      field.onChange(date);
                      setIsOpen(false);
                    }}
                    initialFocus
                  />
                </PopoverContent>
          </Popover>
        </FormItem>
      )}
    />
  )
}

export default DueDate