"use client"

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"
import { useState } from "react"

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


interface ComboProps {
    comboargs: { value: string; label: string }[];
    onChange: (selectedValue: string) => void;
}

const Combobox: React.FC<ComboProps> = ({ comboargs,onChange }: any) => {
    const [open, setOpen] = React.useState(false)
    const [value, setValue] = React.useState("")

    const [selectedValue, setSelectedValue] = useState<string>('');

  const handleSelect = (value: string) => {
    setSelectedValue(value);
    onChange(selectedValue);
   
  };
    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-[200px] justify-between"
                >
                    {value
                        ? comboargs.find((comboargs) => comboargs.value === value)?.label
                        : "Select adjust type..."}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
                <Command>
                    <CommandEmpty>No option chosen.</CommandEmpty>
                    <CommandGroup>
                        {comboargs.map((comboargs) => (
                            <CommandItem
                                key={comboargs.value}
                                value={comboargs.value}
                                onSelect={(currentValue) => {
                                    setValue(currentValue === value ? "" : currentValue)
                                    setOpen(false)
                                }}
                            >
                                <Check
                                    className={cn(
                                        "mr-2 h-4 w-4",
                                        value === comboargs.value ? "opacity-100" : "opacity-0"
                                    )}
                                />
                                {comboargs.label}
                            </CommandItem>
                        ))}
                    </CommandGroup>
                </Command>
            </PopoverContent>
        </Popover>
    )
}

export default Combobox;