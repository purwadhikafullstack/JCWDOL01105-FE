import * as React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useContext } from "react";
import { useDeleteApi } from "@/lib/service";
import { RoomEditor } from "./roomEditor";

import { useDeleteApi } from "@/lib/service";
import { RoomEditor } from "./roomEditor";

import { Button } from "@/components/ui/button";

interface CardProps {
  rooms: {
    id: number;
    name: string;
    price: number;
    description: string;
    guest: number;
    property_id: number;

    // Add other properties as needed
  };
}
import { FormatToIDR } from "@/lib/utils";

const RoomCard: React.FC<CardProps> = ({ rooms }: any) => {
  console.log(rooms);
  // const navigate=useNavigate();
  console.log(rooms.id);

  const config = {
    headers: {
      Accept: "multipart/form-data",
    },
  };
  const { mutate } = useDeleteApi(`/api/roomList/${rooms.id}`, config);

  const handleDeleteClick = async () => {
    console.log("ini testing delete id :", rooms.id);
    try {
      //Sending the property.id to the server
      await mutate(rooms.id);
    } catch (error) {
      // Handle any errors that may occur during the API call
      console.error("Error deleting property data:", error);
    }
  };

  return (
    <Card className="">
      <CardHeader>
        <CardTitle className="break-words overflow-hidden whitespace-nowrap overflow-ellipsis">{rooms.name}</CardTitle>
        <CardDescription>{rooms.description}</CardDescription>
        <CardDescription>Price : {FormatToIDR(rooms.price)}</CardDescription>
        <CardDescription>Guest : {rooms.guest}</CardDescription>
      </CardHeader>
      <CardContent>
        <img className="h-[152px] w-full rounded-xl" src={rooms.image_url} alt={rooms.description} />
      </CardContent>
      <CardContent className="gridcol-1 gap-3 w-">
        <div className="font-bold"> Rules :</div> {rooms.room_info}
      </CardContent>
      <CardFooter className="gridcol-3 gap-3">
        {/* <Button  onClick={()=>{navigate('/')}}>Room Editor</Button> */}
        <RoomEditor roomId={rooms.id} />
        <Button
          onClick={() => {
            handleDeleteClick();
          }}
        >
          {" "}
          Delete{" "}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default RoomCard;
