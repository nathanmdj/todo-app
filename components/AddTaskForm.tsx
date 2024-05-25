"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { Check, ChevronDown } from "lucide-react"
import { useForm } from "react-hook-form"
import {  z } from "zod"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"

import {
  Form,
  FormControl,
  FormField,
  FormItem,
} from "@/components/ui/form"

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

import { toast } from "@/components/ui/use-toast"
import { useState } from "react"
import { Plus, PlusCircleFill } from "react-bootstrap-icons"
import { Input } from "./ui/input"
import Priority from "./Priority"

const location = [
  { label: "Inbox", value: "inbox" },
  { label: "Project X", value: "project-x" },
] as const

const FormSchema = z.object({
  location: z.string(),
  taskname: z.string().min(1),
  description: z.string().min(1),
  priority: z.string(),
})

const AddTaskForm2 = () => {
  const [show, setShow] = useState(false)
  const [addTaskIsHover, setAddTaskIsHover] = useState(false)
  const [isOpen, setIsOpen] = useState(false);

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
  function onSubmit(data: z.infer<typeof FormSchema>) {
    toast({
      title: "Task added",
      description: (
        <pre className="">
          <code className="">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    })

    setShow(false);
    form.reset();
  }

  return (
    <>
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
            <div className="flex">
              {/* Priority */}
              <Priority 
                control={form.control}
                name={'priority'}
                form={form}
              />
            </div>
          </div>
          <div className="flex justify-between border-t p-3" style={{marginTop: '0px'}}>
          <FormField
              control={form.control}
              name="location"
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