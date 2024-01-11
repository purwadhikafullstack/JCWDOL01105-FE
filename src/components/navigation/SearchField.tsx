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
import { setFacility, setQuery } from "@/lib/features/globalReducer";
import { DropdownCalendar } from "../ui/dropdown-calendar";
import { parseDate } from "../../lib/utils";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";
import { setDate as setDateReducer } from "@/lib/features/globalReducer";
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
        date: { from: date?.from?.toLocaleDateString(), to: date?.to?.toLocaleDateString() },
      })
    );
    dispatch(setDateReducer({ from: date.from?.getTime(), to: date.to?.getTime() }));
    dispatch(setFacility(""));
    setLocation("");
    setOpen(false);
  };

  useEffect(() => {
    refetch();
  }, [search, date, queryLocation]);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger className="flex rounded-full border">
        <div className="hidden lg:flex space-x-8 px-6">
          <div className="space-x-2 items-center flex">
            <AddLocationAlt />
            <span>Lokasi</span>
          </div>
          <Separator orientation="vertical" className="h-12" />
          <div className="space-x-2 items-center flex">
            <CalendarMonth />
            <span>Tanggal</span>
          </div>
          <Separator orientation="vertical" className="h-12" />
          <div className="space-x-2 items-center flex">
            <Search />
            <span>Cari...</span>
          </div>
        </div>
        <div className="lg:hidden border rounded-full p-4">
          <Search />
          <span>Cari...</span>
        </div>
      </SheetTrigger>
      <SheetContent side={"top"} className="">
        <div className="flex border w-full lg:w-1/2 mx-auto rounded-full items-center justify-between">
          <Filter />

          <div
            className={`${
              tab === "location" ? "bg-slate-100" : "bg-white"
            } w-1/2 text-center cursor-pointer bg-slate-100 rounded-full`}
            onClick={() => setTab("location")}
          >
            <div>
              <span className="text-sm text-[#FC5185]">Lokasi</span>
            </div>

            <div className="flex justify-center items-center">
              <span>{location ? location : "Cari Lokasi"}</span>
              <span
                className={`${location ? "" : "hidden"} ml-1 text-slate-300 hover:mb-[1px] hover:text-slate-700`}
                onClick={() => setLocation("")}
              >
                <Close fontSize="small" />
              </span>
            </div>
          </div>

          <div
            className={`${
              tab === "date" ? "bg-slate-100" : "bg-white"
            } w-1/2 text-center cursor-pointer bg-slate-100 rounded-full`}
            onClick={() => setTab("date")}
          >
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
                      <Command className="w-[400px] lg:w-[600px] mx-auto">
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
