import * as React from "react"

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"


interface CardProps {
    property: {
        name: string,
        rooms: any,
        // Add other properties as needed
    };
}



const OccupancyCard: React.FC<CardProps> = ({ property }: any) => {

    console.log(property.rooms);
    const displayCard = (data: any) => {
        return data.map((rooms: any, index: number) => (<div><CardContent key={index}>{rooms.room_name}</CardContent><CardContent>Availability : {rooms.availability}</CardContent></div>))
         
    }
    return (

        <Card >
            <CardHeader>
                <CardTitle className="break-words overflow-hidden whitespace-nowrap overflow-ellipsis">{property.name}</CardTitle>
                <CardDescription>Rooms</CardDescription>
            </CardHeader>
            {displayCard(property.rooms)}
            <CardFooter className="gridcol-3 gap-2">
            </CardFooter>
        </Card>

    );

}

export default OccupancyCard;
