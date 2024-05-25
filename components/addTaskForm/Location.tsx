'use client'

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Check } from "lucide-react"
import { useState } from "react"
import { ChevronDown} from "react-bootstrap-icons"

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
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

const location = [
  { label: "Inbox", value: "inbox" },
  { label: "Project X", value: "project-x" },
] as const

type PriorityProps = {
  control: any;
  name: string;
  form: any;
};


const Location:React.FC<PriorityProps> = ({control, name, form}) => {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex flex-col">
          <Popover open={isOpen} onOpenChange={setIsOpen}>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant="ghost"
                  role="combobox"
                  className={cn(
                    "min-w-[120px] justify-between h-8",
                    !field.value && "text-muted-foreground"
                  )}
                >
                  {field.value
                    ? location.find(
                        (location) => location.value === field.value
                      )?.label
                    : "Select location"}
                  <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
              <Command>
                <CommandInput placeholder="Search location..." />
                <CommandEmpty>No location found.</CommandEmpty>
                <CommandGroup>
                  <CommandList>
                    {location.map((location) => (
                      <CommandItem
                        value={location.label}
                        key={location.value}
                        onSelect={() => {
                          form.setValue("location", location.value)
                          setIsOpen(false)
                        }}
                        className="hover:cursor-pointer flex justify-between"
                      >
                        {location.label}
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            location.value === field.value
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

export default Location