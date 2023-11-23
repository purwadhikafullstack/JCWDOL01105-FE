import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Search, CalendarMonth, AddLocationAlt, Check } from "@mui/icons-material";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command";
import { cn } from "@/lib/utils";
import { useState } from "react";
const frameworks = [
  {
    value: "next.js",
    label: "Next.js",
  },
  {
    value: "sveltekit",
    label: "SvelteKit",
  },
  {
    value: "nuxt.js",
    label: "Nuxt.js",
  },
  {
    value: "remix",
    label: "Remix",
  },
  {
    value: "astro",
    label: "Astro",
  },
];
const SearchField = () => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    setValue(e.currentTarget.value);
  };

  return (
    <Sheet>
      <SheetTrigger className="flex rounded-full">
        <div className="border rounded-l-full p-3">
          <AddLocationAlt />
          Lokasi
        </div>
        <div className="border p-3">
          <CalendarMonth /> Tanggal
        </div>
        <div className="border rounded-r-full p-3">
          <Search /> Cari...
        </div>
      </SheetTrigger>
      <SheetContent side={"top"}>
        <Command className="w-1/2 mx-auto">
          <CommandInput placeholder="Search framework..." onChangeCapture={(e) => handleChange(e)} value={value} />
          <CommandEmpty>No framework found.</CommandEmpty>
          <CommandGroup>
            {frameworks.map((framework) => (
              <CommandItem
                key={framework.value}
                value={framework.value}
                onSelect={(currentValue) => {
                  setValue(currentValue === value ? "" : currentValue);
                  setOpen(false);
                }}
              >
                {/* <Check className={cn("mr-2 h-4 w-4", value === framework.value ? "opacity-100" : "opacity-0")} /> */}
                {framework.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </SheetContent>
    </Sheet>
  );
};

export default SearchField;
