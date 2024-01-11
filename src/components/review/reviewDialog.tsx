import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogClose
} from "@/components/ui/dialog"
import { Button } from "../ui/button";
import { useForm } from "react-hook-form";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { QueryObserverResult,QueryObserverRefetchErrorResult, RefetchOptions } from "@tanstack/react-query";

interface DialogProps {
    order: {
        id: number;
        start_date: number;
        end_date: number;
        total_price: number;
        guest: number;
        status: string;
        room: { id: number, image_url: string, propertyId: number };
    };

    refetch: (options?: RefetchOptions | undefined)=>Promise<QueryObserverResult<any, Error>| QueryObserverRefetchErrorResult<any, Error>>; // Adjust the type according to your useGetAPI function
}
import { usePostApi } from "@/lib/service";
import { useContext, useState } from "react";
import { AuthContext } from "@/app/AuthContext";

const ReviewDialog: React.FC<DialogProps> = ({ order,refetch }: any) => {

    const form = useForm();
    const [clean, setClean] = useState(0);
    const [security, setSecurity] = useState(0);
    const [satisfied, setSatisfied] = useState(0);
    const [service, setService] = useState(0);
    const { token } = useContext(AuthContext);
    const config = {
        headers: {
            Accept: "multipart/form-data", Authorization: `Bearer ${token}`
        },
    }

    const { mutate, isSuccess, isError } = usePostApi(`/api/review`, config)

    const onSubmit = async (values: any) => {
        try {
            //Form Mutate data for property editor form
            await mutate({ ...values},{onSuccess:refetch});
        }
        catch (error) {
            // Handle any errors that may occur during the API call
            console.error("Error posting review:", error);
        }
    }
   
    return (

        <Dialog>
            <DialogTrigger asChild>
                <Button variant="default">Berikan Ulasan</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Ulasan Order No.:
                        {order.id}
                    </DialogTitle>
                    <DialogDescription>
                        Berikan ulasan dan skor pada kriteria-kriteria di bawah.
                    </DialogDescription>
                </DialogHeader>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8" encType="multipart/form-data">
                        <FormField
                            control={form.control}
                            name="review"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Berikan Kesan Anda</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Kesan Anda" value={field.value || ''} onChange={field.onChange} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="clean"
                            render={({ field }) => (
                                <FormItem>
                                    <div className="flex items-center">
                                        <FormLabel>Clean/ Kebersihan
                                        </FormLabel>
                                        <span className="w-12 rounded-md border border-transparent px-2 py-0.5 text-right text-sm text-muted-foreground hover:border-border">
                                            {clean}
                                        </span>
                                    </div>
                                    <FormControl>

                                        <Slider defaultValue={[clean]}  // Set the initial value from the form or a default value

                                            onValueChange={(value) => {
                                                field.onChange(value[0]); // Update the form field value
                                                setClean(value[0]); // Optionally, update a local state
                                            }}
                                            max={5}
                                            step={1} />
                                    </FormControl>

                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="security"
                            render={({ field }) => (
                                <FormItem>
                                    <div className="flex items-center">
                                        <FormLabel>Security/ Keamanan
                                        </FormLabel>
                                        <span className="w-12 rounded-md border border-transparent px-2 py-0.5 text-right text-sm text-muted-foreground hover:border-border">
                                            {security}
                                        </span>
                                    </div>
                                    <FormControl>

                                        <Slider defaultValue={[security]}  // Set the initial value from the form or a default value
                                            onValueChange={(value) => {
                                                field.onChange(value[0]); // Update the form field value
                                                setSecurity(value[0]); // Optionally, update a local state
                                            }}
                                            max={5}
                                            step={1} />
                                    </FormControl>

                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="satisfied"
                            render={({ field }) => (
                                <FormItem>
                                    <div className="flex items-center">
                                        <FormLabel>Satisfaction/ Kepuasan
                                        </FormLabel>
                                        <span className="w-12 rounded-md border border-transparent px-2 py-0.5 text-right text-sm text-muted-foreground hover:border-border">
                                            {satisfied}
                                        </span>
                                    </div>
                                    <FormControl>

                                        <Slider defaultValue={[satisfied]}  // Set the initial value from the form or a default value
                                            onValueChange={(value) => {
                                                field.onChange(value[0]); // Update the form field value
                                                setSatisfied(value[0]); // Optionally, update a local state

                                            }}
                                            max={5}
                                            step={1} />
                                    </FormControl>

                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="service"
                            render={({ field }) => (
                                <FormItem>
                                    <div className="flex items-center">
                                        <FormLabel>Service/ Pelayanan
                                        </FormLabel>
                                        <span className="w-12 rounded-md border border-transparent px-2 py-0.5 text-right text-sm text-muted-foreground hover:border-border">
                                            {service}
                                        </span>
                                    </div>
                                    <FormControl>

                                        <Slider defaultValue={[service]}  // Set the initial value from the form or a default value
                                            onValueChange={(value) => {
                                                field.onChange(value[0]); // Update the form field value
                                                setService(value[0]); // Optionally, update a local state


                                            }}
                                            max={5}
                                            step={1} />
                                    </FormControl>

                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <DialogClose asChild>
                            <Button type="submit" onClick={() => {
                                form.setValue("propertyId", order.room.propertyId);
                                form.setValue("roomId", order.room.id);
                                form.setValue("orderId", order.id);
                            }}>Post</Button>
                        </DialogClose>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}
export default ReviewDialog;