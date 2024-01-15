import * as React from "react"
import { ScrollArea } from "@/components/ui/scroll-area";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { FormatToIDR } from "@/lib/utils";
interface CardProps {
    property: {
        name: string,
        rooms: any,
        // Add other properties as needed
    };
}



const OccupancyCard: React.FC<CardProps> = ({ property }: any) => {

    const displayCard = (data: any) => {

        if (data.length > 0) {
            return data.map((rooms: any, index: number) => (<div className="border h-content w-[240px] rounded-md"><CardContent className="font-bold" key={index}>{rooms.room_name}</CardContent><CardContent >{FormatToIDR(rooms.room_price)}</CardContent><CardContent>Availability :   <span
                className={`${rooms.availability === "available"
                    ? "bg-green-600"
                    :"bg-red-600"
                    } text-slate-100 border rounded-full px-2 py-1`}
            >{rooms.availability}</span></CardContent></div>))
        }
        else {
            return <CardContent><span className="bg-yellow-600 text-slate-100 border rounded-full px-2 py-1" >No Rooms Added</span></CardContent>
        }

    }
    return (

        <Card >
            <CardHeader>
                <CardTitle className="break-words overflow-hidden whitespace-nowrap overflow-ellipsis">{property.name}</CardTitle>
                <CardDescription>Rooms</CardDescription>
            </CardHeader>
            <ScrollArea className="h-[150px] w-[270px] rounded-md p-2">
                <div className="grid gap-3">
                {displayCard(property.rooms)} </div>
            </ScrollArea>
            <CardFooter className="gridcol-3 gap-2">
            </CardFooter>
        </Card>

    );

}

export default OccupancyCard;
