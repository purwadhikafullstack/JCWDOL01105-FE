import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { useContext, useRef } from "react"
import { AuthContext } from "@/app/AuthContext"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useForm } from "react-hook-form"
import { usePostApi } from "@/lib/service"
import { zodResolver } from "@hookform/resolvers/zod"
import { formRoomSchema } from "@/lib/schema"
import { useParams } from "react-router"
import { AddAPhoto } from "@mui/icons-material"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useState } from "react"

const RoomAdderForm: React.FC = () => {

    const { token } = useContext(AuthContext);
    const formRoom = useForm({ resolver: zodResolver(formRoomSchema) })
    const { id } = useParams();
    const config = {
        headers: {
            "Content-Type": "multipart/form-data", Authorization: `Bearer ${token}`
        },
    }
    const hiddenFileInput = useRef<HTMLInputElement>(null);
    const handleClick = () => {
        if (hiddenFileInput.current) hiddenFileInput.current.click();
    };
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { files } = event.target;
        const selectedFiles = files as FileList;
        formRoom.setValue("file", selectedFiles[0]);
    };
    const { mutate: mutateAddRoom } = usePostApi(`/api/roomList/${id}`, config)
    const onSubmitRooms = async (values: any) => {
        try {
            //Form Mutate data for property editor form
            // const formData = new FormData();
            // formData.append("file", values.file);
            await mutateAddRoom({ ...values });
            //Form Reset
            formRoom.reset();
        } catch (error) {
            // Handle any errors that may occur during the API call
            console.error("Error adding room to property:", error);
        }
    }
    const [inputValue, setInputValue] = useState('');
    const handleChangePrice = (e: React.ChangeEvent<HTMLInputElement>) => {
        const rawValue = e.target.value;
        // Remove non-numeric characters
        const numericValue = rawValue.replace(/[^0-9.]/g, '');

        // Parse the numeric value
        const parsedValue = parseFloat(numericValue);

        // Check if the parsing is successful
        if (!isNaN(parsedValue)) {
            // Format the numeric value as currency
            const formattedValue = new Intl.NumberFormat('en-US', {
              style: 'currency',
              currency: 'IDR',
            }).format(parsedValue);
      
            // Update the input value with the formatted currency
            setInputValue(formattedValue);
        }
         else {
            // If parsing fails, update with raw numeric value
            setInputValue(numericValue);
        }
    };

    return (
        <ScrollArea className="h-[500px] w-[400px] rounded-md border p-5">
            <div className="w-[300px]">
                <Form {...formRoom} >
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
                                        <Input placeholder="Input harga sewa disini" {...field} onChange={(e) => {
                                            // Parse the input value as a float
                                            const parsedValue = parseFloat(e.target.value);
                                            // Check if the parsing is successful and update the field value
                                            if (!isNaN(parsedValue)) {
                                                field.onChange(parsedValue);
                                            }
                                        }}/>
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
                            name="guest"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Jumlah Tamu</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Input jumlah tamu yang diizinkan" {...field} onChange={(e) => {
                                            // Parse the input value as a float
                                            const parsedValue = parseFloat(e.target.value);
                                            // Check if the parsing is successful and update the field value
                                            if (!isNaN(parsedValue)) {
                                                field.onChange(parsedValue);
                                            }
                                        }} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div>
                            <FormLabel>Pilih Gambar Ruangan yang Disewakan</FormLabel>
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
                            control={formRoom.control}
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
                            control={formRoom.control}
                            name="room_info"
                            render={({ field }) => (
                                <FormItem className="break-normal">
                                    <FormLabel>Informasi Peraturan Kamar</FormLabel>
                                    <FormControl >
                                        <Input
                                            style={{ resize: 'none', whiteSpace: 'pre-wrap', overflowWrap: 'break-word' }}
                                            className="h-[150px] break-normal" placeholder="" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit">Confirm</Button>
                    </form>
                </Form></div>
        </ScrollArea>
    )

}

export default RoomAdderForm;