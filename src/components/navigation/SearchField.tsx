import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Search, CalendarMonth, AddLocationAlt } from "@mui/icons-material";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command";
import { useEffect, useState } from "react";
import { DateRange } from "react-day-picker";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { searchSchema } from "@/lib/schema";
import { Calendar } from "../ui/calendar";
import { useGetAPI } from "@/lib/service";
import { useAppDispatch } from "@/lib/features/hook";
import { setQuery } from "@/lib/features/globalReducer";

const SearchField = () => {
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const [queryLocation, setQueryLocation] = useState("kota");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState<DateRange>();

  const form = useForm({ resolver: zodResolver(searchSchema) });
  const {
    data: locations,
    isFetched,
    refetch,
  } = useGetAPI(`/api/property/location?city=${queryLocation}`, "get-location");

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    setValue(e.currentTarget.value);
    setQueryLocation(e.currentTarget.value);
  };

  const onSubmit = () => {
    dispatch(
      setQuery({ city: location, date: { from: date?.from?.toLocaleDateString(), to: date?.to?.toLocaleDateString() } })
    );
  };

  useEffect(() => {
    refetch();
  }, [value, date, queryLocation]);
  return (
    <Sheet>
      <SheetTrigger className="hidden md:flex rounded-full">
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
      <SheetContent side={"top"} className="flex justify-center">
        <Form {...form}>
          <form className="flex border rounded-full items-center">
            <DropdownMenu>
              <DropdownMenuTrigger className="py-2 px-6 flex">
                <AddLocationAlt className="mr-2" />
                {location ? <div>{location}</div> : <div>Lokasi</div>}
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormControl>
                        <Command className="w-[400px] mx-auto">
                          <CommandInput
                            placeholder="Cari lokasi..."
                            onChangeCapture={(e) => handleChange(e)}
                            value={value}
                          />
                          <CommandEmpty>Lokasi tidak ditemukan</CommandEmpty>
                          <CommandGroup>
                            {isFetched &&
                              locations.map((framework: any) => (
                                <CommandItem
                                  key={framework.id}
                                  // value={framework.id}
                                  onSelect={(currentValue) => {
                                    // setValue(currentValue === value ? "" : currentValue);
                                    setLocation(currentValue === value ? "" : currentValue);
                                    setOpen(false);
                                  }}
                                >
                                  {framework.city}
                                </CommandItem>
                              ))}
                          </CommandGroup>
                        </Command>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </DropdownMenuContent>
            </DropdownMenu>
            <DropdownMenu>
              <DropdownMenuTrigger className="flex py-2 px-6">
                <CalendarMonth className="mr-2" />
                {date ? (
                  <p>{`${date.from?.toLocaleDateString()} - ${date.to?.toLocaleDateString()}`}</p>
                ) : (
                  <div>Tanggal</div>
                )}
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <Calendar
                  mode="range"
                  // captionLayout="dropdown-buttons"
                  selected={date}
                  onSelect={setDate}
                  fromYear={1960}
                  toYear={2030}
                  className="right-0"
                />
              </DropdownMenuContent>
            </DropdownMenu>
          </form>
        </Form>
        <Button type="submit" className="rounded-full" onClick={() => onSubmit()}>
          <Search />
        </Button>
      </SheetContent>
    </Sheet>
  );
};

export default SearchField;
