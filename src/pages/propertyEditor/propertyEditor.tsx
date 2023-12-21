import { useParams } from 'react-router';
import { useForm } from 'react-hook-form';
import { useRef } from 'react';
import { useGetAPI, usePutApi, usePostApi } from '@/lib/service';
import { AddAPhoto } from '@mui/icons-material';
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
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import RoomCard from '@/components/room/roomCard';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { formPropertySchema, formRoomSchema } from '@/lib/schema';
import { zodResolver } from '@hookform/resolvers/zod';
import ProtectedRouteTenant from '@/components/auth/ProtectedRouteTenant';
import { useContext } from 'react';
import { AuthContext } from '@/app/AuthContext';
import PropSpecialPrice from '../tenantProperty/propertySpecialPrice';
import RoomAdderForm from '@/components/room/roomAdder';
// const initialPropertyData = {

//     name: "",
//     description: "",
//     image_url: "",
//     category_id: "1",
// }


const initialRoomData = {

    name: "",
    price: 0,
    description: "",
    person: 0,
}

const PropertyEditor: React.FC = () => {
  console.log("Property Editor");

  const formProp = useForm({ defaultValues: initialPropertyData });
  const formRoom = useForm({ defaultValues: initialRoomData });
  const { id } = useParams();
  console.log(id);

  const config = {
    headers: {
      Accept: "multipart/form-data",
    },
  };

  const { mutate: mutateProperty } = usePutApi(`/api/propertyList/${id}`, config);
    const formProp = useForm({ defaultValues: initialPropertyData, resolver: zodResolver(formPropertySchema) })
    const formRoom = useForm({ defaultValues: initialRoomData, resolver: zodResolver(formRoomSchema) })
    const { id } = useParams();
    console.log(id);

  const { mutate: mutateAddRoom } = usePostApi(`/api/roomList/${id}`, config);

  const { data } = useGetAPI(`/api/roomList/${id}`, "get", config);


    const { token } = useContext(AuthContext)
    const formProp = useForm({ resolver: zodResolver(formPropertySchema) })
    const { id } = useParams();
    console.log(id);

    const config = {
        headers: {
            Accept: 'multipart/form-data'
        }
    }

    const { mutate: mutateProperty } = usePutApi(`/api/propertyList/${id}`, config)

    const { data, isFetched, refetch } = useGetAPI(`/api/roomList/${id}`, "room");

    const onSubmit = async (values: any) => {
        try {
            //Form Mutate data for property editor form
            const formData = new FormData();
            formData.append("file", values.file);
            await mutateProperty({ ...values });
            //Form Reset
            formProp.reset();
        }
        catch (error) {
            // Handle any errors that may occur during the API call
            console.error("Error editing property data:", error);
        }

  const onSubmit = async (values: any) => {
    console.log("ini testing values :", values);
    try {
      //Form Mutate data for property editor form
      await mutateProperty({ ...values });
      //Form Reset
      formProp.reset();
    } catch (error) {
      // Handle any errors that may occur during the API call
      console.error("Error editing property data:", error);
    }
   
    const displayCard = () => {
        if (data && isFetched)
            return data.map((room: any, index: number) => (<RoomCard key={index} rooms={room} />)
            )
        else { refetch() }
    }


    const hiddenFileInput = useRef<HTMLInputElement>(null);

    const handleClick = () => {
        if (hiddenFileInput.current) hiddenFileInput.current.click();
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { files } = event.target;
        const selectedFiles = files as FileList;
        formProp.setValue("file", selectedFiles[0]);
        // const fileValue = selectedFiles.length > 0 ? selectedFiles[0] : null;
        // form.setValue("file", fileValue!);
    };

    return (

        <ProtectedRouteTenant>
            <div >
                <MainNavBarTenant />
                <br />
                <Tabs defaultValue="propertyEditor" className="w-[900px]  ">
                    <TabsList>
                        <TabsTrigger value="propertyEditor" className='w-[300px] p-2 '>Property Editor</TabsTrigger>
                        <TabsTrigger value="room" className='w-[300px] p-2 '>Ruangan</TabsTrigger>
                        <TabsTrigger value="specialPrice" className='w-[300px] p-2 '>Pengaturan Harga</TabsTrigger>
                    </TabsList>
                    <TabsContent value="propertyEditor">
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
                                    name="category_id"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Deskripsi Terbaru Properti Anda</FormLabel>
                                            <FormControl>
                                                <RadioGroup onValueChange={field.onChange} defaultValue={`${field.value}`}>
                                                    <div className="flex items-center space-x-2">
                                                        <RadioGroupItem value="1" id="1" />
                                                        <Label htmlFor="option-one">Villa</Label>
                                                    </div>
                                                    <div className="flex items-center space-x-2">
                                                        <RadioGroupItem value="2" id="2" />
                                                        <Label htmlFor="option-two">Hotel</Label>
                                                    </div>
                                                    <div className="flex items-center space-x-2">
                                                        <RadioGroupItem value="3" id="3" />
                                                        <Label htmlFor="option-two">Apartment</Label>
                                                    </div>
                                                </RadioGroup>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <div>
                                    <FormLabel>Pilih Gambar Properti</FormLabel>
                                    <div className="flex mt-2">
                                        <Button type="button"
                                            className="bg-slate-100 rounded-full shadow-2xl text-black px-6 font-normal text-md hover:bg-slate-200 "
                                            onClick={() => handleClick()}
                                        >
                                            <AddAPhoto fontSize="small" className="mr-2" />
                                            Upload
                                        </Button>
                                    </div>
                                </div>
                                <FormField
                                    control={formProp.control}
                                    name="file"
                                    render={() => (
                                        <FormItem>
                                            <FormControl>
                                                <Input
                                                    ref={hiddenFileInput}
                                                    className="hidden"
                                                    type="file"
                                                    id="file"
                                                    onChange={(value) => handleChange(value)}
                                                />
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
                            <SheetContent className='w-600'>
                                <SheetHeader>
                                    <SheetTitle>Room Details</SheetTitle>
                                    <SheetDescription>
                                        Here you can add rooms to your property to rent to users in our platform.
                                    </SheetDescription>
                                </SheetHeader>
                            <RoomAdderForm/>
                            </SheetContent>
                        </Sheet>
                    </TabsContent>
                    <TabsContent value="specialPrice">
                        <PropSpecialPrice />
                    </TabsContent>
                </Tabs>
            </div>
        </ProtectedRouteTenant >
    );
}

export default PropertyEditor;
