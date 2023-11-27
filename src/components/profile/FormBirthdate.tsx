import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Form, FormMessage, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { DropdownCalendar } from "../ui/dropdown-calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "../ui/button";
import { birthdateSchema } from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { format } from "date-fns";
import { useState } from "react";
import { CalendarMonth } from "@mui/icons-material";
import { usePutApi } from "@/lib/service";
import { useContext, useEffect } from "react";
import { AuthContext } from "@/app/AuthContext";
import { toast } from "sonner";
import { useAppDispatch } from "@/lib/features/hook";
import { setRand } from "@/lib/features/globalReducer";

const FormBirthDate = ({ birthdate }: { birthdate: any }) => {
  const dispatch = useAppDispatch();
  const { id, bearer } = useContext(AuthContext);
  const initForm = {
    birthdate: birthdate ? birthdate : new Date(),
  };
  const form = useForm({ resolver: zodResolver(birthdateSchema), defaultValues: initForm });
  const [date, setDate] = useState<Dater>(new Date());
  const { mutate, isSuccess, isError } = usePutApi(`/api/user/${id}`, bearer);
  const onSubmit = (values: object) => {
    mutate({ birthdate: date?.getTime() });
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("Sukses Mengedit");
      dispatch(setRand(Math.random()));
    }
    if (isError) {
      toast.error("Gagal Mengedit");
    }
  }, [isSuccess, isError]);

  return (
    <Dialog>
      <DialogTrigger>
        <p className="italic hover:underline hover:cursor-pointer font-medium">Ubah</p>
      </DialogTrigger>
      <DialogContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit, (err: any) => console.log(err))} encType="multipart/form-data">
            <DialogTitle className="mb-2">Ubah Tanggal Lahir</DialogTitle>
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
                      <DropdownCalendar
                        mode="single"
                        captionLayout="dropdown"
                        selected={date}
                        onSelect={setDate}
                        {...field}
                        initialFocus
                        fromYear={1960}
                        toYear={new Date().getFullYear()}
                      />
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
      </DialogContent>
    </Dialog>
  );
};

export default FormBirthDate;
