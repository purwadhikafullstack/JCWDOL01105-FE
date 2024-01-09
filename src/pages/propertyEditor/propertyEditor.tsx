import { useParams } from 'react-router';
import { useForm } from 'react-hook-form';
import { useRef } from 'react';
import { useGetAPI, usePutApi } from '@/lib/service';
import { AddAPhoto } from '@mui/icons-material';
import { useState, useEffect } from 'react';
import MainNavBarTenant from '@/components/mainNavBarTenant/mainNavBarTenant';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command";
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
import { formPropertySchema} from '@/lib/schema';
import { zodResolver } from '@hookform/resolvers/zod';
import ProtectedRouteTenant from '@/components/auth/ProtectedRouteTenant';
import { useContext } from 'react';
import { AuthContext } from '@/app/AuthContext';
import PropSpecialPrice from '../tenantProperty/propertySpecialPrice';
import RoomAdderForm from '@/components/room/roomAdder';

const PropertyEditor: React.FC = () => {
    console.log("Property Editor");
    const { token } = useContext(AuthContext)
    const formProp = useForm({ resolver: zodResolver(formPropertySchema) })
    const { id } = useParams();

    const config = {
        headers: {
            "Content-Type": "multipart/form-data", Authorization: `Bearer ${token}`
        },
    }
    const { mutate: mutateProperty } = usePutApi(`/api/propertyList/${id}`, config)
    const { data, isFetched, refetch } = useGetAPI(`/api/roomList/${id}`, "room");
    const [search, setSearch] = useState("");
    const [queryLocation, setQueryLocation] = useState("kota");
    const [location, setLocation] = useState("");
    const {
        data: locations,
        isFetched: isFetchedLoc,
        refetch: refetchLoc,
    } = useGetAPI(`/api/property/location?city=${queryLocation}`, "get-location");

    const handleChangeLocation = (e: React.FormEvent<HTMLInputElement>) => {
        setSearch(e.currentTarget.value);
        setQueryLocation(e.currentTarget.value);
    };
    useEffect(() => {
        refetchLoc();
    }, [search, queryLocation]);
    ////////////////////////////////////////
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
                                    name="categoryId"
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
                                <FormField
                                    control={formProp.control}
                                    name="location"
                                    render={({ field }) => (
                                        <FormItem >
                                            <FormControl>
                                                <FormItem>
                                                    <Command className="w-[400px] md:w-[500px] lg:w-[600px]">
                                                        <CommandInput
                                                            placeholder="Cari lokasi..."
                                                            onChangeCapture={(e) => handleChangeLocation(e)}
                                                            value={search}
                                                        />
                                                        <CommandEmpty className={`${search.length > 0 ? "" : "hidden"} font-thin pt-4`}>
                                                            Lokasi tidak ditemukan....
                                                        </CommandEmpty>
                                                        <CommandGroup>
                                                            {isFetchedLoc &&
                                                                search.length > 0 &&
                                                                locations.map((location: any) => (
                                                                    <CommandItem
                                                                        key={location.id}
                                                                        onSelect={() => {
                                                                            setLocation(location.city);
                                                                            // Update the form value when a CommandItem is selected
                                                                            field.onChange(location.city);
                                                                            // Clear the search
                                                                            setSearch("");
                                                                        }}
                                                                        {...field}
                                                                    >
                                                                        {location.city}
                                                                    </CommandItem>
                                                                ))}
                                                        </CommandGroup>
                                                    </Command>
                                                    <Label className={`${location ? "hidden" : ""} text-sm font-thin`}>
                                                        Masukkan lokasi properti yang akan disewakan
                                                    </Label><Label className={`${location ? "" : "hidden"} text-sm font-thin`}>
                                                        {location}
                                                    </Label>
                                                </FormItem>
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
                                <RoomAdderForm />
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



