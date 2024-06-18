'use client'

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Check } from "lucide-react"
import { useMemo, useState } from "react"
import { Flag, FlagFill } from "react-bootstrap-icons"
import { addDays, format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"

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

type Props = {
  control: any;
  name: string;
  form: any;
};

const DueDate:React.FC<Props> = ({control, name, form}) => {
  const [isOpen, setIsOpen] = useState(false)
  
  const isDisabled = useMemo(() => {
    const currentDate = addDays(new Date(), -1)
    return (date: Date) =>  date < currentDate;
  }, [])
  

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
            <PopoverContent className="w-auto p-0 h-auto" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={(date) => {
                      field.onChange(date);
                      setIsOpen(false);
                      console.log('due date', date);
                      
                    }}
                    // disabled={isDisabled}
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