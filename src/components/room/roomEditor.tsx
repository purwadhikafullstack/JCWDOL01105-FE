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

import { useForm } from "react-hook-form"
import { usePutApi } from "@/lib/service"

interface RoomEditorProps{
    roomId : number,
}


export const RoomEditor:React.FC<RoomEditorProps>=(roomId:any)=>{

    const formRoom = useForm();
    const config = {
        headers: {
            Accept: 'multipart/form-data'
        }
    }
    console.log(roomId.roomId);
    const { mutate: mutateEditRoom } = usePutApi(`/api/roomList/${roomId.roomId}`, config)

    const onSubmitRooms = async (values: any) => {
        try {
            //Form Mutate data for property editor form
            await mutateEditRoom({ ...values });
            console.log(roomId.roomId)
            //Form Reset
            formRoom.reset();
        } catch (error) {
            // Handle any errors that may occur during the API call
            console.error("Error adding room to property:", error);
        }
    }

    return(
        <Sheet>
        <SheetTrigger asChild>
            <Button >Edit Room</Button>
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


    )

}