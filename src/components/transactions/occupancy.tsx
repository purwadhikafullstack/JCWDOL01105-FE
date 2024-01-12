
import { useContext, useEffect } from "react";
import { useGetAPI } from "@/lib/service";
import { AuthContext } from "@/app/AuthContext";
import { useState } from "react";
import { Calendar } from "../ui/calendar";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"

import OccupancyCard from "./occupancyCard";

const Occupancy = () => {


    const [date, setDate] = useState<Date>(new Date());
    const { token } = useContext(AuthContext);
    const config = {
        headers: {
            Accept: "multipart/form-data", Authorization: `Bearer ${token}`
        },
    }

    const currentDate = new Date();

    const dateBigInt = Date.parse(date ? new Date(date.setHours(14, 0, 0, 0)).toISOString() : currentDate.toISOString());
    console.log(date)
    console.log(dateBigInt);


    const { data, isFetched, refetch } = useGetAPI(`/api/roomList/occupancyData/${dateBigInt}`, "occupancy-disable", config);
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

    console.log(data);
    const propertiesArray = data ? Object.values(data) : [];
    useEffect(() => { refetch() }, [date])
    const displayCard = () => {
        if (data && isFetched) {
            return propertiesArray.map((properties: any, index: number) => (
                <CarouselItem><OccupancyCard key={index} property={properties ?? {}} /></CarouselItem>
            ));
        } else {
            refetch();
            return null; // You might want to return something, or nothing, when data is not fetched
        }
    };

    return (
        <>
            <div className="flex justify-between space-x-20">
                {/* Calendar */}
                <div>
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
                // Add any other props or styles you need
                />
                </div>
                <div className="flex-grow grid gap-3 p-4 md:w-[500px] md:grid-cols-4 lg:w-screen justify-between">
                    <Carousel>
                        <CarouselContent >
                            {displayCard()}
                        </CarouselContent>
                        <CarouselPrevious />
                        <CarouselNext />
                    </Carousel>
                </div>
            </div>
        </>
    )
}

export default Occupancy;