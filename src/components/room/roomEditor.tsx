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
import { ScrollArea } from "@/components/ui/scroll-area"
import { AddAPhoto } from "@mui/icons-material"
import { useContext } from "react"
import { useRef } from "react"
import { useForm } from "react-hook-form"
import { usePutApi } from "@/lib/service"
import { AuthContext } from "@/app/AuthContext"

interface RoomEditorProps {
    roomId: number,
}


export const RoomEditor: React.FC<RoomEditorProps> = (roomId: any) => {

    const formRoom = useForm();
    const {token}=useContext(AuthContext);
    const config = {
        headers: {
            "Content-Type": 'multipart/form-data',
            Authorization: `Bearer ${token}`
        }
    }
    console.log(roomId.roomId);
    const { mutate: mutateEditRoom } = usePutApi(`/api/roomList/${roomId.roomId}`, config)

    const onSubmitRooms = async (values: any) => {
        try {
            //Form Mutate data for property editor form
            const formData = new FormData();
            formData.append("file", values.file);
            await mutateEditRoom({ ...values });
            console.log(roomId.roomId)
            //Form Reset
            formRoom.reset();
        } catch (error) {
            // Handle any errors that may occur during the API call
            console.error("Error adding room to property:", error);
        }
    }


    const hiddenFileInput = useRef<HTMLInputElement>(null);

    const handleClick = () => {
        if (hiddenFileInput.current) hiddenFileInput.current.click();
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { files } = event.target;
        const selectedFiles = files as FileList;
        formRoom.setValue("file", selectedFiles[0]);
        // const fileValue = selectedFiles.length > 0 ? selectedFiles[0] : null;
        // form.setValue("file", fileValue!);
    };

    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button >Edit </Button>
            </SheetTrigger>
            <SheetContent side={"top"} >
                <SheetHeader>
                    <SheetTitle>Room Details</SheetTitle>
                    <SheetDescription>
                        Here you can add rooms to your property to rent to users in our platform.
                    </SheetDescription>
                </SheetHeader>
                <ScrollArea className="h-[500px] w-[700px] rounded-md border p-5">
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
                            name="guest"
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
                        <div>
                            <FormLabel>Pilih Gambar Baru Ruangan</FormLabel>
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
                                    <FormLabel>Edit Peraturan Kamar</FormLabel>
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
                </Form>
            </ScrollArea>
            </SheetContent>
        </Sheet>


    )

}