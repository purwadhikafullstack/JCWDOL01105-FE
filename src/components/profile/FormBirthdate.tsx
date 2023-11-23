import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Form, FormControl, FormMessage, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "../ui/button";
import { nameSchema } from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { format } from "date-fns";
import { useState } from "react";
import { CalendarMonth } from "@mui/icons-material";

const FormBirthDate = ({ birthdate }: { birthdate: any }) => {
  const initForm = {
    birthdate: birthdate ? birthdate : Date.now(),
  };
  const form = useForm({ resolver: zodResolver(nameSchema), defaultValues: initForm });
  const [date, setDate] = useState<Date>();
  const onSubmit = (values: any) => {
    console.log("this", values);
  };

  return (
    <Dialog>
      <DialogTrigger>
        <p className="italic hover:underline hover:cursor-pointer font-medium">Ubah</p>
      </DialogTrigger>
      <DialogContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit, (err: any) => console.log(err))} encType="multipart/form-data">
            <DialogTitle className="mb-2">Ubah Nama Lengkap</DialogTitle>
            <DialogDescription className="my-4">Pastikan data yang kamu input valid</DialogDescription>
            <FormField
              control={form.control}
              name="birthdate"
              render={({ field }) => (
                <FormItem className="mb-3">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-[300px] justify-start text-left font-normal",
                          !date && "text-muted-foreground"
                        )}
                      >
                        <CalendarMonth className="mr-2 h-4 w-4" />
                        {date ? format(date, "PPP") : <span>Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar mode="single" selected={date} onSelect={setDate} {...field} initialFocus />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex">
              <Button type="submit" className="text-xl font-semibold mx-auto">
                Simpan
              </Button>
            </div>
          </form>
        </Form>
        {/* <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={cn("w-[280px] justify-start text-left font-normal", !date && "text-muted-foreground")}
            >
              <CalendarMonth className="mr-2 h-4 w-4" />
              {date ? format(date, "PPP") : <span>Pick a date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
          </PopoverContent>
        </Popover> */}
      </DialogContent>
    </Dialog>
  );
};

export default FormBirthDate;
