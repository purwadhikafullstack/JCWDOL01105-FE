
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useGetAPI, usePostApi } from "@/lib/service";
import { AuthContext } from "@/app/AuthContext";
import { useState } from "react";
import { Calendar } from "../ui/calendar";
import { useParams } from "react-router";
import { CircleBackslashIcon } from "@radix-ui/react-icons";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"

const Occupancy = () => {


    const [date, setDate] = useState<Date>(new Date());
    const [footerValue, setFooter] = useState("")
    const { token } = useContext(AuthContext);
    const form = useForm();
    const handleFooter = () => {
        if (date) {
            setFooter(`You picked ${date}`)

        }
        else if (date === undefined) {
            setFooter("Pick a Date")
        }
    }
    const config = {
        headers: {
            Accept: "multipart/form-data", Authorization: `Bearer ${token}`
        },
    }

    const currentDate=new Date();

    const dateBigInt = Date.parse(date ? date.toISOString() : currentDate.toISOString());
    console.log(dateBigInt);


    const { data, isFetched, refetch } = useGetAPI(`/api/roomList/occupancyData/${dateBigInt}`, "occupancy-disable", config);
    // const { data: dataOrder, isFetched: isFetchedOrder, refetch: refetchOrder } = useGetAPI(`/api/occupancyOrder`, "occupancy-order", config);
    // const { data: dataSpecial, isFetched: isFetchedSpecial, refetch: refetchSpecial } = useGetAPI(`/api/occupancySpecial`, "occupancy-special", config);

    const handleDatePick = (selectedDate: Date) => {
        if (new Date() > selectedDate) {
            return true;
        }
        else if (new Date() === selectedDate) {
            return false;
        }
        else {
            return false;
        }
    };

    return (
        <>

            <Calendar
                mode="single"
                selected={date}
                onSelect={(selectedDate) => {
                    // Update the date state
                    setDate(selectedDate as Date);
                    refetch();
                }}
                fromYear={1960}
                toYear={2030}
                disabled={handleDatePick}
                className="right-0"
                footer={footerValue}
            // Add any other props or styles you need
            />

        </>

    )
}

export default Occupancy;