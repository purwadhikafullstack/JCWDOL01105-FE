import * as React from "react"
import { useContext } from "react";
import { useNavigate } from "react-router"
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
  DialogClose
} from "@/components/ui/dialog"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { QueryObserverResult, QueryObserverRefetchErrorResult, RefetchOptions } from "@tanstack/react-query";
import { useDeleteApi } from "@/lib/service"
import { Button } from "@/components/ui/button"
import { AuthContext } from "@/app/AuthContext";

interface CardProps {
  property: {
    id: number,
    name: string;
    description: string;
    image_url: string;
    category: any
    // Add other properties as needed
  };

  refetch: (options?: RefetchOptions | undefined) => Promise<QueryObserverResult<any, Error> | QueryObserverRefetchErrorResult<any, Error>>; // Adjust the type according to your useGetAPI function
}
const PropertyCard: React.FC<CardProps> = ({ property, refetch }: any) => {
  console.log(property)
  const navigate = useNavigate();
  console.log(property.id);
  const { token } = useContext(AuthContext)

  const config = {
    headers: {
      "Content-Type": "multipart/form-data", Authorization: `Bearer ${token}`
    },
  }
  const { mutate } = useDeleteApi(`/api/propertyList/${property.id}`, config)
  const handleDeleteClick = async () => {
    console.log("ini testing delete id :", property.id);
    try {
      //Sending the property.id to the server
      await mutate(property.id, { onSuccess: refetch });
    }
    catch (error) {
      // Handle any errors that may occur during the API call
      console.error("Error editing property data:", error);
    }
  }

  return (

    <Card className="" >
      <CardHeader>
        <CardTitle className="break-words overflow-hidden whitespace-nowrap overflow-ellipsis">{property.name}</CardTitle>
        <CardDescription >{property.category.category}</CardDescription>
        <CardDescription>{property.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <img className="h-[172px] w-full rounded-xl" src={property.image_url} />
      </CardContent>
      <CardFooter className="gridcol-3 gap-3">
        <Button onClick={() => { navigate(`/tenant/propertyEditor/${property.id}`) }}>Details</Button>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="destructive">Delete</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogTitle>Apakah Anda yakin ingin Menghapus Properti? </DialogTitle>
            <DialogClose asChild>
              <Button onClick={() => { handleDeleteClick() }}> Ya </Button>
            </DialogClose>
            <DialogClose asChild>
              <Button variant="destructive">Batal</Button>
            </DialogClose>
          </DialogContent>
        </Dialog>
      </CardFooter>
    </Card>

  );
}
export default PropertyCard;
