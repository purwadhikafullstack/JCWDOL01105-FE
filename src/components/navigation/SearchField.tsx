import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Search, CalendarMonth, AddLocationAlt, Close } from "@mui/icons-material";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command";
import { useEffect, useState } from "react";
import { DateRange } from "react-day-picker";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { searchSchema } from "@/lib/schema";
import { useGetAPI } from "@/lib/service";
import { useAppDispatch } from "@/lib/features/hook";
import { setQuery } from "@/lib/features/globalReducer";
import { DropdownCalendar } from "../ui/dropdown-calendar";
import { parseDate } from "../../lib/utils";
import { Label } from "../ui/label";
import Filter from "./Filter";

const SearchField = () => {
  const dispatch = useAppDispatch();
  const form = useForm({ resolver: zodResolver(searchSchema) });

  const [search, setSearch] = useState("");
  const [queryLocation, setQueryLocation] = useState("kota");
  const [location, setLocation] = useState("");
  const [tab, setTab] = useState("location");
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState<DateRange>({ from: new Date(), to: new Date(new Date().getTime() + 24 * 36 * 1e5) });

  const {
    data: locations,
    isFetched,
    refetch,
  } = useGetAPI(`/api/property/location?city=${queryLocation}`, "get-location");

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    setSearch(e.currentTarget.value);
    setQueryLocation(e.currentTarget.value);
  };

  const onSubmit = () => {
    dispatch(
      setQuery({
        city: location,
        date: { from: date?.from?.setHours(14, 0, 0, 0), to: date?.to?.setHours(12, 0, 0, 0) },
      })
    );
    setOpen(false);
    setLocation("");
  };

  useEffect(() => {
    refetch();
  }, [search, date, queryLocation]);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger className="hidden md:flex rounded-full">
        <div className="border rounded-l-full py-2 px-8">
          <AddLocationAlt className="mr-2" /> Lokasi
        </div>
        <div className="border py-2 px-8">
          <CalendarMonth className="mr-2" /> Tanggal
        </div>
        <div className="border rounded-r-full py-2 px-6">
          <Search className="mr-2" /> Cari...
        </div>
      </SheetTrigger>
      <SheetContent side={"top"} className="">
        <div className="flex border w-full md:w-1/2 mx-auto rounded-full items-center justify-between">
          <Filter />

          <div className="w-1/2 text-center cursor-pointer" onClick={() => setTab("location")}>
            <div>
              <span className="text-sm text-[#FC5185]">Lokasi</span>
            </div>

            <div className="h-4 flex justify-center items-center">
              <span>{location ? location : "Cari Lokasi"}</span>
              <span
                className={`${location ? "" : "hidden"} ml-1 text-slate-300 hover:mb-[1px] hover:text-slate-700`}
                onClick={() => setLocation("")}
              >
                <Close fontSize="small" />
              </span>
            </div>
          </div>

          <div className="w-1/2  text-center cursor-pointer" onClick={() => setTab("date")}>
            <div>
              <span className="text-sm text-[#FC5185]">Tanggal</span>
            </div>
            <div>
              <span>{parseDate(date)}</span>
            </div>
          </div>

          <Button type="submit" className="rounded-full w-12 h-12" onClick={() => onSubmit()}>
            <Search />
          </Button>
        </div>

        <Form {...form}>
          <form className="flex justify-center items-center mt-12">
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem className={`${tab === "location" ? "" : "hidden"}`}>
                  <FormControl>
                    <FormItem>
                      <Command className="w-[400px] md:w-[500px] lg:w-[600px] mx-auto">
                        <CommandInput
                          placeholder="Cari lokasi..."
                          onChangeCapture={(e) => handleChange(e)}
                          value={search}
                        />
                        <CommandEmpty className={`${search.length > 0 ? "" : "hidden"} font-thin pt-4`}>
                          Lokasi tidak ditemukan....
                        </CommandEmpty>
                        <CommandGroup>
                          {isFetched &&
                            search.length > 0 &&
                            locations.map((location: any) => (
                              <CommandItem
                                key={location.id}
                                onSelect={() => {
                                  setLocation(location.city);
                                  setSearch("");
                                }}
                                {...field}
                              >
                                {location.city}
                              </CommandItem>
                            ))}
                        </CommandGroup>
                      </Command>
                      <Label className={`${search ? "hidden" : ""} text-sm font-thin`}>
                        Lawang tersebar di seluruh Indonesia, lebih dari 500 lokasi
                      </Label>
                    </FormItem>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem className={`${tab === "date" ? "" : "hidden"}`}>
                  <DropdownCalendar
                    mode="range"
                    captionLayout="dropdown-buttons"
                    selected={date}
                    onSelect={(city: { from?: Date; to?: Date } | undefined) => {
                      if (city?.from != null) {
                        setDate({ from: city.from, to: city?.to });
                      }
                    }}
                    {...field}
                    disabled={(date) => date < new Date(Date.now() - 24 * 36e5)}
                    fromYear={1960}
                    toYear={2030}
                    numberOfMonths={2}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
};

export default SearchField;
