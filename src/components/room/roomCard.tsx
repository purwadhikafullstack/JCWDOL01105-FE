import * as React from "react"
import { useNavigate } from "react-router"
 import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { useDeleteApi } from "@/lib/service"
import { RoomEditor } from "./roomEditor"
  
import { Button } from "@/components/ui/button"


  interface CardProps {
    rooms: {
        id:number,
        name: string,
        price : number,
        description: string,
        person: number,
        property_id : number,

        // Add other properties as needed
    };
}



const RoomCard: React.FC<CardProps>= ({rooms}:any)=> {

console.log(rooms)
    // const navigate=useNavigate();
    console.log(rooms.id);

    const config = {
      headers: {
        Accept: 'multipart/form-data'
      }
    }
  const {mutate}=useDeleteApi(`/api/roomList/${rooms.id}`,config)

  const handleDeleteClick = async () => {
    console.log("ini testing delete id :", rooms.id);
    try {
    //Sending the property.id to the server
      await mutate(rooms.id);
    }
    catch (error) {
      // Handle any errors that may occur during the API call
      console.error("Error deleting property data:", error);
    }

  }


  return (

<Card className="" >
  <CardHeader>
    <CardTitle>{rooms.name}</CardTitle>
    <CardDescription>{rooms.description}</CardDescription>
    <CardDescription>Price : {rooms.price}</CardDescription>
  </CardHeader>
  <CardContent className="gridcol-1 gap-3 w-">
  Price : {rooms.price} 
  Guest : {rooms.person}
  </CardContent>
  <CardFooter className="gridcol-3 gap-3">
    {/* <Button  onClick={()=>{navigate('/')}}>Room Editor</Button> */}
    <RoomEditor roomId={rooms.id}/>
    <Button  onClick={()=>{handleDeleteClick()}}> Delete </Button>
  </CardFooter>
</Card>

  );
  
}

export default RoomCard;
