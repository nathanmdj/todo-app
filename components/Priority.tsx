

const Priority = () => {
  return (
    <FormField
    control={form.control}
    name="priority"
    render={({ field }) => (
      <FormItem className="">
        <Popover open={isOpen} onOpenChange={setIsOpen}>
          <PopoverTrigger asChild>
            <FormControl>
              <Button
                variant="outline"
                role="combobox"
                className={cn(
                  "min-w-[120px] justify-between h-8",
                  !field.value && "text-muted-foreground"
                )}
              >
                {field.value
                  ? priority.find(
                      (priority) => priority.value === field.value
                    )?.label
                  : "Select priority"}
                
              </Button>
            </FormControl>
          </PopoverTrigger>
          <PopoverContent className="w-[200px] p-0">
            <Command>
              <CommandInput placeholder="Search priority..." />
              <CommandEmpty>No priority found.</CommandEmpty>
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
                      className="hover:cursor-pointer"
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          priority.value === field.value
                            ? "opacity-100"
                            : "opacity-0"
                        )}
                      />
                      {priority.label}
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