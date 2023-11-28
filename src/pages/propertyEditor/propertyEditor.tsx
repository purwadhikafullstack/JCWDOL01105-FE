import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { useForm } from 'react-hook-form';
import { useGetAPI, usePutApi, usePostApi } from '@/lib/service';
import { getRoomData } from '@/api/roomDataAPI';
import MainNavBarTenant from '@/components/mainNavBarTenant/mainNavBarTenant';
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"

import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import RoomCard from '@/components/room/roomCard';
const initialPropertyData = {

    name: "",
    description: "",
    image_url: "",
}


const initialRoomData = {

    name: "",
    price: 0,
    description: "",
    person: 0,
}


const PropertyEditor: React.FC = () => {


    console.log("Property Editor");

    const formProp = useForm({ defaultValues: initialPropertyData, })
    const formRoom = useForm({ defaultValues: initialRoomData, })
    const { id } = useParams();
    console.log(id);

    const config = {
        headers: {
            Accept: 'multipart/form-data'
        }
    }

    const configGet = {headers:{

        Authorization :"123"
    }}

    

    const { mutate: mutateProperty } = usePutApi(`/api/propertyList/${id}`, config)

    const { mutate: mutateAddRoom } = usePostApi(`/api/roomList/${id}`, config)

    // const {data,isLoading,isError,refetch}=useGetAPI(`/api/roomList/${id}`,"room");

    // console.log(data);


    const fetchRoomData = async () => {
        try {
          const result = await getRoomData(id)
          console.log(result);
          setRoomData(result.data.data);
          console.log(roomData);
        }
        catch (error) {
          console.error("Error Message :", error);
        }
  
      };

    const [roomData, setRoomData] = useState([]);
    useEffect(() => { fetchRoomData() }, [mutateAddRoom,])
    

    const onSubmit = async (values: any) => {
        console.log("ini testing values :", values);
        try {
            //Form Mutate data for property editor form
            await mutateProperty({ ...values });
            //Form Reset
            formProp.reset();
        }
        catch (error) {
            // Handle any errors that may occur during the API call
            console.error("Error editing property data:", error);
        }

    }

    const onSubmitRooms = async (values: any) => {
        try {
            //Form Mutate data for property editor form
            await mutateAddRoom({ ...values });
            //Form Reset
            formRoom.reset();
        } catch (error) {
            // Handle any errors that may occur during the API call
            console.error("Error adding room to property:", error);
        }
    }

    const displayCard = () => {

        return roomData.map((room: any, index: number) => ( <RoomCard key={index} rooms={room} /> )
        )
      }

    return (
        <>
            <MainNavBarTenant />
            <br />

            <Tabs defaultValue="account" className="w-[400px]">
                <TabsList>
                    <TabsTrigger value="property">Property</TabsTrigger>
                    <TabsTrigger value="room">Ruangan</TabsTrigger>
                </TabsList>
                <TabsContent value="property">
                    <Form {...formProp}>
                        <form onSubmit={formProp.handleSubmit(onSubmit)} className="space-y-8" encType="multipart/form-data">
                            <FormField
                                control={formProp.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Nama Baru Properti Anda</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Nama Properti Anda" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={formProp.control}
                                name="description"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Deskripsi Terbaru Properti Anda</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Deskripsikan Properti Anda" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={formProp.control}
                                name="image_url"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>URL Terbaru Gambar Properti Anda</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Masukkan Link Gambar Properti Anda" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button type="submit">Confirm</Button>
                        </form>
                    </Form>

                </TabsContent>
                <TabsContent value="room" >
                    <div className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                    {displayCard()}
                    </div>
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button >Add Rooms</Button>
                        </SheetTrigger>
                        <SheetContent>
                            <SheetHeader>
                                <SheetTitle>Room Details</SheetTitle>
                                <SheetDescription>
                                    Here you can add rooms to your property to rent to users in our platform.
                                </SheetDescription>
                            </SheetHeader>
                            <Form {...formRoom}>
                                <form onSubmit={formRoom.handleSubmit(onSubmitRooms)} className="space-y-8" encType="multipart/form-data">
                                    <FormField
                                        control={formRoom.control}
                                        name="name"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Nama Ruangan</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Nama Ruangan" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={formRoom.control}
                                        name="price"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Harga Sewa Normal/ Malam</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={formRoom.control}
                                        name="description"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Deskripsi Ruangan</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Deskripsikan ruangan yang Anda Sewakan" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={formRoom.control}
                                        name="person"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Jumlah Tamu</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <Button type="submit">Confirm</Button>
                                </form>
                            </Form>

                        </SheetContent>
                    </Sheet>
                </TabsContent>
            </Tabs>





        </>

    );
}

export default PropertyEditor;



