import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { useGetAPI, usePostApi } from "@/lib/service";
import { AuthContext } from "@/app/AuthContext";
import { useState } from "react";
import { Calendar } from "../ui/calendar";
import { CircleBackslashIcon } from "@radix-ui/react-icons";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface DisableRoomProps {
  roomId: number;
}

const RoomDisable: React.FC<DisableRoomProps> = (roomId) => {
  const [date, setDate] = useState<Date>();
  const [footerValue] = useState("");
  const { token } = useContext(AuthContext);
  const form = useForm();

  const config = {
    headers: {
      Accept: "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },
  };

  const { mutate } = usePostApi(`/api/disableRoom/${roomId.roomId}`, config);
  const { data, refetch } = useGetAPI(`/api/disableRoom/${roomId.roomId}`, "unavailableDates");

  // const handleDatePick=(date:any)=>{
  //     if (date > new Date())
  //     {
  //         for(let i=0;i<data.length;i++)
  //         {
  //             if(date.toISOstring()===data[i])
  //             {
  //                 return true;
  //             }
  //         }
  //         data.some(date=>)
  //     }
  //     else if (new Date()> date)
  //     {
  //         return true;
  //     }
  //     else{
  //         return false;
  //     }

  // }

  // const handleDatePick = (selectedDate: Date) => {
  //     if (selectedDate > new Date()) {
  //       return data.some((date:any) => selectedDate.toISOString() === date.toISOString());
  //     } else if (new Date() > selectedDate) {
  //       return true;
  //     } else {
  //       return false;
  //     }
  //   };

  const handleDatePick = (selectedDate: Date) => {
    if (selectedDate > new Date()) {
      return data.some((dateString: any) => {
        const date = new Date(dateString);
        return selectedDate.toISOString() === date.toISOString();
      });
    } else if (new Date() > selectedDate) {
      return true;
    } else {
      return false;
    }
  };
  const onSubmit = async (values: any) => {
    try {
      // Call the mutate function to make the POST request
      await mutate({ ...values });
    } catch (error) {
      // Handle any errors that may occur during the API call
    }
  };

  return (
    <>
      <Sheet>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <SheetTrigger asChild>
                <Button onClick={() => refetch()} variant="destructive">
                  <CircleBackslashIcon />
                </Button>
              </SheetTrigger>
            </TooltipTrigger>{" "}
            <TooltipContent>
              <p>Disable Room</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <SheetContent>
          <SheetHeader>
            <SheetTitle>Disable Room</SheetTitle>
            <SheetDescription>Here you can disable the chosen room for a particular date.</SheetDescription>
          </SheetHeader>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8" encType="multipart/form-data">
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Pilih Tanggal</FormLabel>
                    <FormControl>
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={(selectedDate) => {
                          // Update the date state
                          setDate(selectedDate as Date);
                          // Update the form field value
                          field.onChange(selectedDate);
                        }}
                        fromYear={1960}
                        toYear={2030}
                        disabled={(date) => handleDatePick(date)}
                        className="right-0"
                        footer={footerValue}
                        // Add any other props or styles you need
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">Konfirmasi</Button>
            </form>
          </Form>
        </SheetContent>
      </Sheet>
    </>
  );
};
export default RoomDisable;
